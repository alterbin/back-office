// eslint-disable-next-line import/no-extraneous-dependencies
import { toast, ToastOptions } from 'react-hot-toast';
import { AxiosError } from 'axios';

interface QueryKeys {
    create: string;
    read: string;
    readOne: string;
    update: string;
    patch: string;
    put: string;
    delete: string;
  }

export function getQueryKeys(namespace: string): QueryKeys {
  return {
    create: `${namespace}/create`,
    read: `${namespace}/read`,
    readOne: `${namespace}/readOne`,
    update: `${namespace}/update`,
    patch: `${namespace}/patch`,
    put: `${namespace}/put`,
    delete: `${namespace}/delete`,
  };
}

/**
 * Displays an error toast notification.
 * @param message - The error message to display.
 * @param toastId - An optional unique identifier for the toast.
 */
export const errorToast = (message = 'Something went wrong', toastId?: string) => {
  if (toastId) {
    toast.dismiss(toastId);
  }
  toast.error(message, { id: toastId });
};

/**
 * Displays a success toast notification.
 * @param message - The success message to display.
 * @param toastOptions - Optional toast options or a unique identifier.
 */
export const successToast = (message = 'Successful', toastOptions?: ToastOptions | string) => {
  const isToastId = typeof toastOptions === 'string';
  const toastId = isToastId ? toastOptions : undefined;
  const options = isToastId ? {} : (toastOptions as ToastOptions);

  if (toastId) {
    // Dismiss existing toast with the same ID before showing the new one
    toast.dismiss(toastId);
  }
  toast.success(message, { id: toastId, ...options });
};

export function handleErrors(error: AxiosError): string {
  if (error.response) {
    return `Error: ${error.response.status} - ${error.response.statusText}`;
  } if (error.request) {
    return 'Error: No response received from the server';
  }
  return 'Error: Request failed to be sent';
}
