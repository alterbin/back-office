import React from 'react';
import {getProfileImage} from '@/utils';
import Image from 'next/image';
import {useAdminDeleteSession} from '@/hooks';
import {LogOut} from '../svgs';
import {Profile as TProfile} from '../../services/queries/profile/types';

interface IProps {
  setShowSidebar?: React.Dispatch<React.SetStateAction<boolean>>;
  type?: 'header' | 'sidebar';
  data?: TProfile;
}

export function Profile(props: IProps) {
  const [userDropDown, setUserDropDown] = React.useState(false);
  const {
    setShowSidebar = () => null,
    type = 'header',
    data = {} as TProfile,
  } = props;

  const profileImage = getProfileImage(data);
  const {logout} = useAdminDeleteSession();

  const isHeader = type === 'header';
  const isSidebar = type === 'sidebar';

  const name = (
    <h6 className="Articulat-Semibold text-capitalize">
      {data.firstName} {data.lastName}
    </h6>
  );

  return (
    <div className="app__dashboard_layout__header__profile">
      {isHeader && (
        <>
          <div
            className="relative"
            // x-data="{ dropdownOpen: false }"
            // @click.outside="dropdownOpen = false"
            onClick={() => setUserDropDown(prev => !prev)}
          >
            <a
              className="flex items-center text-gray-700"
              href="#"
              // @click.prevent="dropdownOpen = ! dropdownOpen"
            >
              <span className="mr-3 h-11 w-11 overflow-hidden rounded-full">
                <Image
                  className="app__dashboard_layout__header__profile__img"
                  height={40}
                  width={40}
                  src={profileImage}
                  alt=""
                />{' '}
              </span>

              <span className="text-theme-sm mr-1 block font-medium">
                {name}
              </span>

              <svg
                // :class="dropdownOpen && 'rotate-180'"
                className={`${
                  userDropDown ? 'rotate-180' : 'rotate-0'
                } stroke-gray-500`}
                width="18"
                height="20"
                viewBox="0 0 18 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.3125 8.65625L9 13.3437L13.6875 8.65625"
                  stroke=""
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </a>
          </div>
          <div
            className={`${
              userDropDown ? 'flex' : 'hidden'
            } shadow-theme-lg dark:bg-gray-dark absolute right-3 top-[90px] w-[260px] flex-col rounded-2xl border border-gray-200 bg-white p-3`}
          >
            <div>
              <span className="text-theme-sm block font-medium text-gray-700 border-b border-gray-200 pb-3">
                {name}
              </span>
            </div>
            <button
              className="group text-theme-sm mt-3 flex items-center gap-3 rounded-lg py-2 font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-700"
              onClick={logout}
            >
              <LogOut className="cursor-pointer ms-1 my-auto" />
              Sign Out
            </button>
          </div>
        </>
      )}

      {/* {isSidebar && (
        <button type="button" onClick={logout} className=" flex gap-3 bg-transparent border-0">
          <span className="text-white ms-3 font-semibold">Logout</span>
          <LogOut className="cursor-pointer ms-1 my-auto" />
        </button>
      )} */}

      {type === 'header' && (
        <span
          role="none"
          onClick={() => setShowSidebar(prev => !prev)}
          className="cursor-pointer block lg:hidden  ml-4"
        >
          {/* eslint-disable-next-line @typescript-eslint/no-use-before-define */}
          <Hamburger />
        </span>
      )}
    </div>
  );
}

function Hamburger() {
  return (
    <button
      title="sidebar"
      className="flex h-10 w-10 items-center justify-center rounded-lg !border-gray-200 text-gray-500 xl:h-11 xl:w-11 xl:!border"
    >
      <svg
        className="!fill-gray-500"
        width="16"
        height="12"
        viewBox="0 0 16 12"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0.583252 1C0.583252 0.585788 0.919038 0.25 1.33325 0.25H14.6666C15.0808 0.25 15.4166 0.585786 15.4166 1C15.4166 1.41421 15.0808 1.75 14.6666 1.75L1.33325 1.75C0.919038 1.75 0.583252 1.41422 0.583252 1ZM0.583252 11C0.583252 10.5858 0.919038 10.25 1.33325 10.25L14.6666 10.25C15.0808 10.25 15.4166 10.5858 15.4166 11C15.4166 11.4142 15.0808 11.75 14.6666 11.75L1.33325 11.75C0.919038 11.75 0.583252 11.4142 0.583252 11ZM1.33325 5.25C0.919038 5.25 0.583252 5.58579 0.583252 6C0.583252 6.41421 0.919038 6.75 1.33325 6.75L7.99992 6.75C8.41413 6.75 8.74992 6.41421 8.74992 6C8.74992 5.58579 8.41413 5.25 7.99992 5.25L1.33325 5.25Z"
        />
      </svg>
    </button>
  );
}

