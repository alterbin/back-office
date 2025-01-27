import routes from '@/utils/routes';
import { useSearchParams } from 'next/navigation';

export const useAdminDeleteSession = () => {
  const searchParams = useSearchParams();
  const next = searchParams.get('next');

  const logout = () => {
    localStorage.clear();

    setTimeout(() => {
      window.location.href = routes.home.path + (next ? `?next=${next}` : '');
    }, 1500);
  };

  return { logout };
};
