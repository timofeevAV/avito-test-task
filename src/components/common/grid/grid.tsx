import clsx from 'clsx';
import GridItem from './grid-item';

export default function Grid(props: React.ComponentProps<'ul'>) {
  return (
    <ul
      {...props}
      className={clsx('grid grid-flow-row', props.className)}
    >
      {props.children}
    </ul>
  );
}

Grid.Item = GridItem;
