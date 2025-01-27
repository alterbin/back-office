import { usePathname } from 'next/navigation';

export function useActiveRoute(exact = false) {
  const pathname = usePathname();

  const isActive = (route: string, useExact?: boolean) => {
    if (exact || useExact) {
      return pathname === route ? 'active' : '';
    }

    return pathname === route || pathname.indexOf(route) > -1 ? 'active' : '';
  };

  return { isActive, pathname };
}
