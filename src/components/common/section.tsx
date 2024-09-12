import clsx from 'clsx';

export default function Section(props: React.ComponentProps<'section'>) {
  return (
    <section
      {...props}
      className={clsx('mx-auto mt-10 max-w-screen-2xl', props.className)}
    >
      {props.children}
    </section>
  );
}
