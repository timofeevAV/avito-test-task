import clsx from 'clsx';

export default function GridItem(props: React.ComponentProps<'li'>) {
  return (
    <li
      {...props}
      className={clsx('transition-opacity', props.className)}
    >
      {props.children}
    </li>
  );
}
