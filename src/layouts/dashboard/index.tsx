'use client';

import {
  Fragment, ReactNode, useEffect, useState,
} from 'react';
import { usePathname, useSearchParams, redirect } from 'next/navigation';
import { profileQueries } from '@/services/queries';
import { Drawer, Header, Sidebar } from '../../components';
import config from '../../utils/config';
import routes from '../../utils/routes';
import { getLocalStorage } from '../../utils';

const decodeJwt = (jwt: string) => {
  try {
    return JSON.parse(atob(jwt.split('.')[1]));
  } catch (error) {
    return { exp: 0 };
  }
};

interface IProps {
  children: ReactNode;
}

function Main({ children }: IProps) {
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
}

function Content({ children }: IProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const asPath = `${pathname}?${searchParams.toString()}`;

  const data = {
    firstName: "Adminstrator",
    lastName: ""
  };

  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    setShowSidebar(false);
  }, [asPath]);

  return (
    <Fragment>
      <Drawer show={showSidebar} handleClose={() => setShowSidebar(false)}>
        <Sidebar className="" data={data} />
      </Drawer>

      <div className="app__dashboard_layout">
        <Sidebar data={data} />

        <main className="app__dashboard_layout__main">
          <Header data={data} setShowSidebar={setShowSidebar} />

          <div className="app__dashboard_layout__main__content">
            <Main>{children}</Main>
          </div>
        </main>
      </div>
    </Fragment>
  );
}

export default function Layout({ children }: IProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const asPath = `${pathname}?${searchParams.toString()}`;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const token = getLocalStorage<string>(config.tokenKey);
    const exp = decodeJwt(token as string).exp * 1000;
    const now = new Date().getTime();

    if (exp > now) {
      setMounted(true);
    } else {
      redirect(`${routes.home.path}?next=${asPath}`);
    }
  }, []);

  if (!mounted) {
    return null;
  }

  return <Content>{children}</Content>;
}
