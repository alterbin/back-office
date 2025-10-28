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
          >
            <a
              className="flex items-center text-gray-700"
              href="#"
              // @click.prevent="dropdownOpen = ! dropdownOpen"
            >
              <span className="mr-3 h-11 w-11 overflow-hidden rounded-full">
                <Image
                  className="app__dashboard_layout__header__profile__img !bg-blue"
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
                className="stroke-gray-500"
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
          className="cursor-pointer block lg:hidden"
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
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="css-i6dzq1"
    >
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}
