import React, { useState, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ActionsIcon } from "../svgs";

export type ActionType = {
  label: string;
  onClick: (e: any) => void;
  variant?: "normal" | "danger";
  disabled?: boolean;
  icon?: React.ReactNode;
};

type ActionablesProps = {
  actions?: ActionType[];
  customTrigger?: React.ReactNode;
  forceDropdown?: boolean;
};

export const Actionables: React.FC<ActionablesProps> = ({
  actions,
  customTrigger,
  forceDropdown = false,
}) => {
  if (actions && (forceDropdown || actions.length > 1)) {
    return (
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="p-2 bg-gray-100 rounded-md hover:bg-gray-200">
            {customTrigger || <ActionsIcon stroke="var(--red)" />}
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
            {actions.map((action, i) => (
              <div key={i} className="p-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={action.onClick}
                      disabled={action.disabled}
                      className={`group flex w-full items-center px-4 py-2 text-sm rounded-md ${
                        action.variant === "danger"
                          ? "text-red-600"
                          : "text-gray-900"
                      } ${active ? "bg-gray-100" : ""}`}
                    >
                      {action.icon && (
                        <span className="mr-2">{action.icon}</span>
                      )}
                      {action.label}
                    </button>
                  )}
                </Menu.Item>
              </div>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    );
  }

  if (customTrigger) {
    const triggers = Array.isArray(customTrigger)
      ? customTrigger
      : [customTrigger];
    return (
      <>
        {triggers.map((trigger, i) => (
          <div key={i}>{trigger}</div>
        ))}
      </>
    );
  }

  const [action] = actions ?? [];
  if (action) {
    return (
      <button
        type="button"
        onClick={action.onClick}
        disabled={action.disabled}
        className="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200"
      >
        {action.icon ? (
          <div className="flex items-center gap-2">
            {action.label}
            {action.icon}
          </div>
        ) : (
          action.label
        )}
      </button>
    );
  }

  return null;
};
