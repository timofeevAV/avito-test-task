import clsx from 'clsx';
import Icon from './icon';
import { useState } from 'react';

interface AccordionProps extends React.ComponentProps<'div'> {
  label: string;
}

export default function Accordion({ label, ...props }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <label
        className={clsx(
          'flex cursor-pointer items-center justify-between text-sm uppercase transition-all duration-300',
          {
            ['mb-2']: isOpen,
          },
        )}
        onClick={toggleAccordion}
      >
        <span>{label}</span>
        <Icon
          id="icon-arrow-down"
          className={clsx('transform transition-transform duration-300', {
            ['rotate-180']: isOpen,
          })}
        />
      </label>
      <div className="overflow-hidden">
        <div
          className={clsx(
            'max-h-0 overflow-auto transition-[max-height] duration-300',
            {
              ['max-h-64']: isOpen,
            },
          )}
        >
          {props.children}
        </div>
      </div>
    </div>
  );
}
