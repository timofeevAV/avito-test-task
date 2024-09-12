import clsx from 'clsx';
import { FormikState, Formik } from 'formik';
import { useState } from 'react';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { Input, TextArea, Button } from '../common';

const advertisementSchema = z.object({
  imageUrl: z.string().url('Неверный формат URL').optional(),
  name: z
    .string({
      required_error: 'название обязательно',
    })
    .min(1),
  description: z.string().optional(),
  price: z.coerce
    .number({
      required_error: 'цена обязательна',
    })
    .min(0, 'Цена должна быть положительной'),
});

export type AdvertisementFormValues = z.infer<typeof advertisementSchema>;
export type ResetForm = (
  nextState?: Partial<FormikState<AdvertisementFormValues>>,
) => void;

interface AdvertisementFormformikProps extends React.ComponentProps<'form'> {
  initialValues?: AdvertisementFormValues;
  handleSubmit: (values: AdvertisementFormValues, resetForm: ResetForm) => void;
  submitButtonText: string;
}

export default function AdvertisementForm({
  initialValues = {
    imageUrl: '',
    name: '',
    description: '',
    price: 0,
  },
  handleSubmit,
  submitButtonText,
  ...props
}: AdvertisementFormformikProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(
    (initialValues && initialValues.imageUrl) || null,
  );

  const handleImageUrlChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: string) => void,
  ) => {
    const value = e.target.value;
    setFieldValue('imageUrl', value);

    try {
      const url = new URL(value);
      setImagePreview(url.toString());
    } catch {
      setImagePreview(null);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={toFormikValidationSchema(advertisementSchema)}
      onSubmit={(values, { resetForm }) => {
        handleSubmit(values, resetForm);
      }}
    >
      {(formikProps) => (
        <form
          {...props}
          onSubmit={formikProps.handleSubmit}
          className={clsx('space-y-2', props.className)}
        >
          <div className="flex items-end gap-2">
            <div className="grow">
              <Input
                labelTitle="URL изображения"
                id="imageUrl"
                name="imageUrl"
                value={formikProps.values.imageUrl}
                onChange={(e) =>
                  handleImageUrlChange(e, formikProps.setFieldValue)
                }
                onBlur={formikProps.handleBlur}
                className={clsx('grow', {
                  ['border-red-500']:
                    formikProps.touched.imageUrl && formikProps.errors.imageUrl,
                })}
              />
            </div>
            {imagePreview && (
              <div className="h-10 w-10 overflow-hidden rounded-md border border-muted-foreground">
                <img
                  src={imagePreview}
                  alt="Миниатюра изображения"
                  className="h-full w-full object-cover"
                />
              </div>
            )}
          </div>
          {formikProps.touched.imageUrl && formikProps.errors.imageUrl && (
            <div className="text-xs lowercase text-red-500">
              {formikProps.errors.imageUrl}
            </div>
          )}
          <Input
            labelTitle="Название"
            id="name"
            name="name"
            value={formikProps.values.name}
            onChange={formikProps.handleChange}
            onBlur={formikProps.handleBlur}
            className={clsx({
              ['border-red-500']:
                formikProps.touched.name && formikProps.errors.name,
            })}
          />

          {formikProps.touched.name && formikProps.errors.name && (
            <div className="text-xs lowercase text-red-500">
              {formikProps.errors.name}
            </div>
          )}

          <TextArea
            labelTitle="Описание"
            id="description"
            name="description"
            value={formikProps.values.description}
            onChange={formikProps.handleChange}
            onBlur={formikProps.handleBlur}
          />

          <Input
            labelTitle="Стоимость"
            id="price"
            name="price"
            type="number"
            value={formikProps.values.price}
            onChange={formikProps.handleChange}
            onBlur={formikProps.handleBlur}
            className={clsx({
              ['border-red-500']:
                formikProps.touched.price && formikProps.errors.price,
            })}
          />
          {formikProps.touched.price && formikProps.errors.price && (
            <div className="text-xs lowercase text-red-500">
              {formikProps.errors.price}
            </div>
          )}
          <Button
            type="submit"
            className="w-full"
          >
            {submitButtonText}
          </Button>
        </form>
      )}
    </Formik>
  );
}
