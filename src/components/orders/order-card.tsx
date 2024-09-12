import type { Order } from '@/api/types';
import { formatDate, formatPrice } from '@/util';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon } from '../common';
import { useUpdateOrder } from '@/api/api';

export default function OrderCard({ order }: { order: Order }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const { isPending, mutate } = useUpdateOrder(order.id);

  const handleCompleteOrder = () => {
    mutate({
      ...order,
      status: 5,
    });
  };

  const renderStatus = (status: Order['status']) => {
    switch (status) {
      case 0:
        return 'Создан';
      case 1:
        return 'Оплачен';
      case 2:
        return 'Транспортировка';
      case 3:
        return 'Доставлен в пункт выдачи';
      case 4:
        return 'Получен';
      case 5:
        return 'Архив';
      case 6:
        return 'Возврат';
      default:
        return 'Неизвестный статус';
    }
  };

  return (
    <>
      <div className="flex justify-between">
        <h2 className="font-semibold text-primary">Заказ №{order.id}</h2>
        <p>Статус: {renderStatus(order.status)}</p>
      </div>
      <p className="text-sm text-muted-foreground">
        Создан: {formatDate(new Date(order.createdAt))}
      </p>
      <p className="text-sm text-muted-foreground">
        Количество товаров: {order.items.length}
      </p>

      <div className="flex gap-2">
        {order.status !== 5 && (
          <Button
            onClick={handleCompleteOrder}
            className="mt-2 h-auto text-xs"
            disabled={isPending}
            iconLeft={
              isPending && (
                <Icon
                  id="icon-spinner"
                  className="animate-spin"
                />
              )
            }
          >
            {isPending ? 'Завершаем...' : 'Завершить заказ'}
          </Button>
        )}

        <Button
          onClick={toggleAccordion}
          className="mt-2 h-auto text-xs"
        >
          {isOpen ? 'Скрыть товары' : 'Показать товары'}
        </Button>
      </div>

      {isOpen && (
        <ul className="mt-2 rounded-md bg-muted p-2">
          {order.items.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between py-2"
            >
              <Link
                to={`/advertisement/${item.id}`}
                className="group flex items-center space-x-4"
              >
                <img
                  src={item.imageUrl || 'https://placehold.co/400'}
                  alt={item.name}
                  className="h-20 w-20 rounded-sm object-cover"
                />
                <p className="text-primary group-hover:underline">
                  {item.name}
                </p>
              </Link>
              <div className="text-right">
                <p className="text-sm">{formatPrice(item.price)}</p>
                <p className="text-xs text-muted-foreground">x {item.count}</p>
              </div>
            </li>
          ))}
        </ul>
      )}

      <p className="mt-4 text-right font-bold text-foreground">
        Итог: {formatPrice(order.total)}
      </p>
    </>
  );
}
