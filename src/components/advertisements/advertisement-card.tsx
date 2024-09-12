import type { Advertisement } from '@/api/types';
import { formatPrice } from '@/util';
import { useNavigate, Link } from 'react-router-dom';
import { Icon, Button } from '../common';

export default function AdvertisementCard({
  advertisement,
}: {
  advertisement: Advertisement;
}) {
  const navigate = useNavigate();

  return (
    <Link
      className="relative inline-block h-full w-full"
      to={`/advertisement/${advertisement.id}`}
    >
      <div className="absolute inset-0">
        <div className="relative h-full w-full">
          <div
            style={{
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundImage: `url(${advertisement.imageUrl})`,
              backgroundRepeat: 'no-repeat',
            }}
            className="absolute inset-0"
          ></div>
        </div>
      </div>
      <div className="absolute inset-0 flex flex-col items-stretch justify-end text-sm">
        <div className="mx-1 mb-1 space-y-1 rounded-md bg-background/20 px-2 py-2 backdrop-blur-md">
          <h3 className="font-bold">{advertisement.name}</h3>
          <div className="flex items-center justify-between">
            <span>{formatPrice(advertisement.price)}</span>
            <div className="flex items-center gap-2">
              <Icon id="icon-eye" />
              <span>{advertisement.views}</span>
              <Icon id="icon-heart" />
              <span>{advertisement.likes}</span>
            </div>
          </div>
          <Button
            className="h-auto w-full text-xs"
            onClick={(e) => {
              e.preventDefault();
              navigate(`/orders?advertisementId=${advertisement.id}`);
            }}
            secondary
          >
            Заказы
          </Button>
        </div>
      </div>
    </Link>
  );
}
