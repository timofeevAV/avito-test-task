import clsx from 'clsx';

interface InputProps extends React.ComponentProps<'input'> {
  labelTitle?: string;
}

export default function Input({ labelTitle, ...props }: InputProps) {
  return (
    <div>
      {labelTitle && (
        <label
          htmlFor={props.id}
          className="mb-2 block text-sm font-medium text-muted-foreground"
        >
          {labelTitle}
        </label>
      )}
      <input
        {...props}
        className={clsx(
          'flex h-10 w-full text-ellipsis rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          props.className,
        )}
      />
    </div>
  );
}
