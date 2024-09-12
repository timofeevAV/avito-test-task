import { SVGProps } from 'react';

interface IconProps extends SVGProps<SVGSVGElement> {
  id: string;
}

export default function Icon({ id, ...rest }: IconProps) {
  return (
    <svg
      width="1em"
      height="1em"
      fill="currentColor"
      {...rest}
    >
      <use xlinkHref={`/images/sprite.svg#${id}`} />
    </svg>
  );
}
