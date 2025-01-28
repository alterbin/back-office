import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';

interface IProps {
  children: React.ReactNode;
  tooltip: string | string[];
  isList?: boolean;
}

export function Tooltip(props: IProps) {
  const { children, tooltip, isList = false } = props;

  return (
    <Popover className="relative">
      <Popover.Button className="focus:outline-none">
        {children}
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute z-10 mt-2 w-max max-w-xs p-2 bg-gray-800 text-white rounded-lg shadow-lg">
          {isList && Array.isArray(tooltip) ? (
            <ul className="list-disc list-inside">
              {tooltip.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          ) : (
            <span>{tooltip}</span>
          )}
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}