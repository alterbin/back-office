"use client";
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
} from "@headlessui/react";
import React, { Fragment, useRef } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  children?: React.ReactNode;
  size?: "sm" | "md" | "lg";
};

export const ModalContainer: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  message,
  children,
  size = "lg",
}) => {
  const cancelButtonRef = useRef(null);

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-20"
        initialFocus={cancelButtonRef}
        onClose={onClose}
      >
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black backdrop-blur-[4px] bg-opacity-60 transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 z-20 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel
                className={`relative w-full transform overflow-hidden rounded-[4px] bg-white text-left transition-all sm:my-8 sm:w-full 
                ${size === "md" ? "md:max-w-md" : ""}
                ${size === "sm" ? "md:max-w-sm" : ""}
                ${size === "lg" ? "md:max-w-xl" : ""}
                `}
              >
                <div
                  className={`relative w-full max-w-[584px] rounded-3xl bg-white p-6 pb-0 lg:p-10 lg:pb-0`}
                >
                  <h2 className="text-lg font-bold text-gray-800">
                    {title || "Title"}
                  </h2>
                  <button
                    onClick={onClose}
                    className="text-text_color text-3xl"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.37585 19.1778L0.820312 17.6223L8.44255 10L0.820312 2.3778L2.37585 0.822266L9.99808 8.4445L17.6203 0.822266L19.1758 2.3778L11.5536 10L19.1758 17.6223L17.6203 19.1778L9.99808 11.5556L2.37585 19.1778Z"
                        fill="var(--text-color)"
                      />
                    </svg>
                  </button>
                </div>
                <div className="bg-white p-6 pt-0 lg:p-10 lg:pt-0 text-gray-800 items-center flex justify-center">
                  {children || message}
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
