import clsx from 'clsx';

interface TextAreaProps extends React.ComponentProps<'textarea'> {
  labelTitle?: string;
}

export default function TextArea({ labelTitle, ...props }: TextAreaProps) {
  return (
    <>
      {labelTitle && (
        <label
          htmlFor={props.id}
          className="mb-2 block text-sm font-medium text-muted-foreground"
        >
          {labelTitle}
        </label>
      )}
      <textarea
        {...props}
        className={clsx(
          'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        )}
      ></textarea>
    </>
  );
}
