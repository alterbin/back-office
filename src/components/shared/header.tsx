import React, {ReactNode} from 'react';
import {usePathname} from 'next/navigation';
import {GetRoutesMap, matchLastRoute} from '../../utils/static';
import {Profile} from './profile';
import {ArrowLeft} from '../svgs';
import {Profile as TProfile} from '../../services/queries/profile/types';

export interface IProps {
  setShowSidebar?: React.Dispatch<React.SetStateAction<boolean>>;
  back?: () => void;
  data?: TProfile;
  children?: ReactNode;
  childrenLeft?: ReactNode;
}

export function Header(props: IProps) {
  const {
    children,
    childrenLeft,
    back,
    data,
    setShowSidebar = () => null,
  } = props;

  const pathname = usePathname();

  const routesMap = GetRoutesMap();
  const matchedRoute = matchLastRoute(pathname, routesMap);
  const currentPage = routesMap[matchedRoute] || {};

  return (
    <header className="sticky top-0 !z-20 flex w-full border-gray-200 bg-white xl:border-b">
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
            <div className="flex w-full items-center justify-between gap-2 px-3 sm:gap-4 xl:justify-normal xl:border-b-0 xl:px-0">
              
              <div className="relative">
                <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2">
                  <svg
                    className="fill-gray-500"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M3.04175 9.37363C3.04175 5.87693 5.87711 3.04199 9.37508 3.04199C12.8731 3.04199 15.7084 5.87693 15.7084 9.37363C15.7084 12.8703 12.8731 15.7053 9.37508 15.7053C5.87711 15.7053 3.04175 12.8703 3.04175 9.37363ZM9.37508 1.54199C5.04902 1.54199 1.54175 5.04817 1.54175 9.37363C1.54175 13.6991 5.04902 17.2053 9.37508 17.2053C11.2674 17.2053 13.003 16.5344 14.357 15.4176L17.177 18.238C17.4699 18.5309 17.9448 18.5309 18.2377 18.238C18.5306 17.9451 18.5306 17.4703 18.2377 17.1774L15.418 14.3573C16.5365 13.0033 17.2084 11.2669 17.2084 9.37363C17.2084 5.04817 13.7011 1.54199 9.37508 1.54199Z"
                      fill=""
                    />
                  </svg>
                </span>
                <input
                  id="search-input"
                  type="text"
                  placeholder="Search or type command..."
                  className=" shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10  h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pr-14 pl-12 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden xl:w-[430px]"
                />

                <button
                  id="search-button"
                  className="absolute top-1/2 right-2.5 inline-flex -translate-y-1/2 items-center gap-0.5 rounded-lg border border-gray-200 bg-gray-50 px-[7px] py-[4.5px] text-xs -tracking-[0.2px] text-gray-500"
                >
                  <span> ⌘ </span>
                  <span> K </span>
                </button>
              </div>
            </div>
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
