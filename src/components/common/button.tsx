import clsx from 'clsx';

interface ButtonProps extends React.ComponentProps<'button'> {
  secondary?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

const buttonClasses =
  'inline-flex h-10 gap-1 items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';

export default function Button({
  secondary,
  iconLeft,
  iconRight,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={clsx(
        buttonClasses,
        {
          ['hover:bg-accent hover:text-accent-foreground']: secondary,
          ['bg-primary text-primary-foreground hover:bg-primary/90']:
            !secondary,
        },
        props.className,
      )}
    >
      {iconLeft}
      {props.children}
      {iconRight}
    </button>
  );
}
