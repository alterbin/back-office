import { Profile } from '@/services/queries/profile/types';

export const getPageHeading = (pathname: string) => {
  const pageName = pathname.substring(pathname.lastIndexOf('/') + 1);
  const segments = pathname.split('/').filter(Boolean);

  if (segments.length === 3) {
    if (segments[0] === 'integrations') {
      return 'Integration';
    }
    if (segments[0] === 'transactions' && segments[1] === '[id]') {
      return 'Transactions';
    }
  }

  switch (pageName) {
    case 'integration-users':
      return 'Music users';

    case 'integrations':
      return 'Music Integration';

    default:
      return pageName;
  }
};

/**
 * Save an item to localStorage
 * @param key - The key to store the item under
 * @param value - The value to store in localStorage
 */
export function saveLocalStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    /* eslint-disable-next-line no-console */
    console.error('Error saving to localStorage', error);
  }
}

/**
 * Get an item from localStorage
 * @param key - The key of the item to retrieve from localStorage
 * @returns The parsed value of the stored item or null if not found
 */
export function getLocalStorage<T>(key: string): T | null {
  if (typeof window === 'undefined') return null;
  const storedData = localStorage.getItem(key);
  try {
    return storedData ? (JSON.parse(storedData) as T) : null;
  } catch (error) {
    /* eslint-disable-next-line no-console */
    console.error('Error parsing JSON from localStorage', error);
    return null;
  }
}

export function getProfileImage(data: Profile) {
  const name = `${data?.firstName || ''} ${data?.lastName || ''}`;
  const imgPlaceholder = `https://ui-avatars.com/api/?name=${name}&background=random&font-size=0.35&rounded=true`;
  return imgPlaceholder;
}

export function getCallbackUrl({ baseUrl = '', url = '' }: { baseUrl?: string; url?: string }) {
  const windowLocation = typeof window !== 'undefined' ? window.location : null;
  const base = baseUrl || (windowLocation ? windowLocation.origin : '');
  return `${base}${url}`;
}

export function errorParser(errors: any, touched: any, key: string): any {
  if (errors[key] && touched[key]) {
    return errors[key];
  }

  return null;
}
