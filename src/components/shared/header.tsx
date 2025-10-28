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
    <header className="sticky top-0 z-99999 flex w-full border-gray-200 bg-white xl:border-b">
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
            <div className="flex w-full items-center justify-between gap-2 border-b border-gray-200 px-3 sm:gap-4 xl:justify-normal xl:border-b-0 xl:px-0 dark:border-gray-800">
              <button
                // :class="sidebarToggle ? 'xl:bg-transparent dark:xl:bg-transparent bg-gray-100 dark:bg-gray-800' : ''"
                className="z-99999 flex h-10 w-10 items-center justify-center rounded-lg border-gray-200 text-gray-500 xl:h-11 xl:w-11 xl:border dark:text-gray-400"
                // @click.stop="sidebarToggle = !sidebarToggle"
              >
                <svg
                  className="hidden fill-current xl:block"
                  width="16"
                  height="12"
                  viewBox="0 0 16 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M0.583252 1C0.583252 0.585788 0.919038 0.25 1.33325 0.25H14.6666C15.0808 0.25 15.4166 0.585786 15.4166 1C15.4166 1.41421 15.0808 1.75 14.6666 1.75L1.33325 1.75C0.919038 1.75 0.583252 1.41422 0.583252 1ZM0.583252 11C0.583252 10.5858 0.919038 10.25 1.33325 10.25L14.6666 10.25C15.0808 10.25 15.4166 10.5858 15.4166 11C15.4166 11.4142 15.0808 11.75 14.6666 11.75L1.33325 11.75C0.919038 11.75 0.583252 11.4142 0.583252 11ZM1.33325 5.25C0.919038 5.25 0.583252 5.58579 0.583252 6C0.583252 6.41421 0.919038 6.75 1.33325 6.75L7.99992 6.75C8.41413 6.75 8.74992 6.41421 8.74992 6C8.74992 5.58579 8.41413 5.25 7.99992 5.25L1.33325 5.25Z"
                    fill=""
                  />
                </svg>
                {/* 
        <svg
          //:class="sidebarToggle ? 'hidden' : 'block xl:hidden'"
          className="fill-current xl:hidden"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M3.25 6C3.25 5.58579 3.58579 5.25 4 5.25L20 5.25C20.4142 5.25 20.75 5.58579 20.75 6C20.75 6.41421 20.4142 6.75 20 6.75L4 6.75C3.58579 6.75 3.25 6.41422 3.25 6ZM3.25 18C3.25 17.5858 3.58579 17.25 4 17.25L20 17.25C20.4142 17.25 20.75 17.5858 20.75 18C20.75 18.4142 20.4142 18.75 20 18.75L4 18.75C3.58579 18.75 3.25 18.4142 3.25 18ZM4 11.25C3.58579 11.25 3.25 11.5858 3.25 12C3.25 12.4142 3.58579 12.75 4 12.75L12 12.75C12.4142 12.75 12.75 12.4142 12.75 12C12.75 11.5858 12.4142 11.25 12 11.25L4 11.25Z"
            fill=""
          />
        </svg>

        <svg
          //:class="sidebarToggle ? 'block xl:hidden' : 'hidden'"
          className="fill-current"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M6.21967 7.28131C5.92678 6.98841 5.92678 6.51354 6.21967 6.22065C6.51256 5.92775 6.98744 5.92775 7.28033 6.22065L11.999 10.9393L16.7176 6.22078C17.0105 5.92789 17.4854 5.92788 17.7782 6.22078C18.0711 6.51367 18.0711 6.98855 17.7782 7.28144L13.0597 12L17.7782 16.7186C18.0711 17.0115 18.0711 17.4863 17.7782 17.7792C17.4854 18.0721 17.0105 18.0721 16.7176 17.7792L11.999 13.0607L7.28033 17.7794C6.98744 18.0722 6.51256 18.0722 6.21967 17.7794C5.92678 17.4865 5.92678 17.0116 6.21967 16.7187L10.9384 12L6.21967 7.28131Z"
            fill=""
          />
        </svg> */}
              </button>
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
