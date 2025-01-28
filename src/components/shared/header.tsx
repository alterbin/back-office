import React, { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { GetRoutesMap, matchLastRoute } from '../../utils/static';
import { Profile } from './profile';
import { ArrowLeft } from '../svgs';
import { Profile as TProfile } from '../../services/queries/profile/types';

export interface IProps {
  setShowSidebar?: React.Dispatch<React.SetStateAction<boolean>>;
  back?: () => void;
  data?: TProfile;
  children?: ReactNode;
  childrenLeft?: ReactNode;
}

export function Header(props: IProps) {
  const {
    children, childrenLeft, back, data, setShowSidebar = () => null,
  } = props;

  const pathname = usePathname();

  const routesMap = GetRoutesMap();
  const matchedRoute = matchLastRoute(pathname, routesMap);
  const currentPage = routesMap[matchedRoute] || {};

  return (
    <header className="app__dashboard_layout__header">
      <div className="app__dashboard_layout__header__content ">
        <div className="d-flex align-items-center">
          {back ? (
            <div
              role="none"
              className="flex items-center cursor-pointer gap-2"
              onClick={back}
            >
              <ArrowLeft className="cursor-pointer" />

              <h3 className="tx_red Articulat-Semibold">{currentPage.label}</h3>
            </div>
          ) : (
            <h3 className="tx_red Articulat-Semibold">{currentPage.label}</h3>
          )}

          {childrenLeft}
        </div>

        <div className="flex items-center">
          {children}
          <Profile data={data} setShowSidebar={setShowSidebar} />
        </div>
      </div>
    </header>
  );
}
