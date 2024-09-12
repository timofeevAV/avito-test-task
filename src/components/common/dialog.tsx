import { useEffect, useRef } from 'react';
import Icon from './icon';
import clsx from 'clsx';

interface DialogProps extends React.ComponentProps<'dialog'> {
  isOpen: boolean;
  closeDialog: () => void;
}

interface DialogTitleProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  className?: string;
  children?: React.ReactNode;
}

const DialogTitle = <T extends React.ElementType = 'h2'>({
  as,
  className = '',
  children,
  ...props
}: DialogTitleProps & React.ComponentProps<T>) => {
  const Tag = as || 'h2';
  return (
    <Tag
      {...props}
      className={`mb-4 text-lg font-semibold ${className}`}
    >
      {children}
    </Tag>
  );
};

export default function Dialog({ isOpen, closeDialog, ...props }: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('no-scroll');
      ref.current?.showModal();
    } else {
      document.body.classList.remove('no-scroll');
      ref.current?.close();
    }
  }, [isOpen]);

  useEffect(() => {
    ref.current?.addEventListener('click', (event) => {
      const rect = ref.current?.getBoundingClientRect();
      const isInDialog =
        rect &&
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width;
      if (!isInDialog) {
        closeDialog();
      }
    });
  });

  return (
    <dialog
      ref={ref}
      onCancel={closeDialog}
      className={clsx(
        'relative my-0 w-full overflow-hidden bg-transparent sm:my-auto sm:w-96 sm:py-4 -sm:h-screen',
        props.className,
      )}
    >
      <button
        type="button"
        onClick={closeDialog}
        className="absolute right-2 top-2 rounded-md p-1 text-muted-foreground ring-offset-background hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:top-6"
      >
        <Icon id="icon-cross" />
        <span className="sr-only">Close</span>
      </button>
      <div className="h-full overflow-y-auto rounded-lg bg-background p-4 pt-8 shadow-lg sm:max-h-[calc(100vh-2em)]">
        {props.children}
      </div>
    </dialog>
  );
}

Dialog.Title = DialogTitle;
