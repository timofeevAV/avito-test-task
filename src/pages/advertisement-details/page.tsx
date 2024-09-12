import { useGetAdvertisementById, useUpdateAdvertisement } from '@/api/api';
import { AdvertisementForm } from '@/components/advertisements';
import type { AdvertisementFormValues } from '@/components/advertisements/advertisement-form';
import { Button, Section, Icon, Dialog } from '@/components/common';
import { formatPrice } from '@/util';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function AdvertisementDetails() {
  const navigate = useNavigate();
  const { id = '' } = useParams();
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const {
    data: advertisement,
    isLoading,
    isError,
    refetch,
  } = useGetAdvertisementById(id);
  const updateAdvertisement = useUpdateAdvertisement(id);

  const handleUpdateAdvertisement = (values: AdvertisementFormValues) => {
    const newAdvertisement = {
      ...advertisement,
      ...values,
    };

    updateAdvertisement.mutate(newAdvertisement, {
      onSuccess: () => {
        refetch();
        setDialogIsOpen(false);
      },
    });
  };

  const handleDialogClose = () => {
    setDialogIsOpen(false);
  };

  const handleDialogOpen = () => {
    setDialogIsOpen(true);
  };

  if (isError)
    return (
      <div className="flex flex-col items-center">
        <h2>Ошибка загрузки</h2>
        <Button onClick={() => refetch()}>Повторить</Button>
      </div>
    );

  if (isLoading) {
    return (
      <div className="flex h-screen flex-col rounded-lg border border-border p-8 md:p-12 lg:flex-row lg:gap-8">
        <div className="h-full w-full basis-full animate-pulse bg-background lg:basis-4/6" />
        <div className="lg:basis-2/6animate-pulse basis-full bg-background" />
      </div>
    );
  }

  return (
    <>
      <Section className="space-y-4 px-4">
        <div className="mx-auto mt-5 max-w-screen-2xl">
          <Button
            onClick={() => navigate(-1)}
            secondary
            iconLeft={<Icon id="icon-arrow-left" />}
          >
            Назад
          </Button>
        </div>
        <div className="flex flex-col rounded-lg border border-border p-8 md:p-12 lg:flex-row lg:gap-8">
          <div className="h-full w-full basis-full lg:basis-4/6">
            <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden">
              <img
                src={advertisement?.imageUrl}
                alt={advertisement?.name}
                className="absolute inset-0 h-full w-full object-contain"
              />
            </div>
          </div>
          <div className="basis-full lg:basis-2/6">
            <div className="mb-6 flex flex-col border-b pb-6">
              <div className="mb-2 flex gap-1">
                <h1 className="text-3xl font-medium">{advertisement?.name}</h1>
                <button
                  className="p-1 hover:scale-110 hover:opacity-80"
                  onClick={handleDialogOpen}
                  title="Редактировать"
                >
                  <Icon id="icon-edit" />
                </button>
              </div>
              <div className="mr-auto w-auto rounded-full bg-blue-600 p-2 text-sm text-background">
                <p>{formatPrice(advertisement?.price)}</p>
              </div>
            </div>
            <p>{advertisement?.description}</p>
          </div>
        </div>
      </Section>
      <Dialog
        isOpen={dialogIsOpen}
        closeDialog={handleDialogClose}
      >
        <Dialog.Title>Редактирование объявления</Dialog.Title>
        <AdvertisementForm
          initialValues={advertisement}
          handleSubmit={(values) => {
            handleUpdateAdvertisement(values);
          }}
          submitButtonText="Создать"
        />
        <Button
          type="button"
          className="mt-2 w-full"
          secondary
          onClick={handleDialogClose}
        >
          Отмена
        </Button>
      </Dialog>
    </>
  );
}
