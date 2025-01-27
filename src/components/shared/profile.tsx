import React from 'react';
import { getProfileImage } from '@/utils';
import Image from 'next/image';
import { useAdminDeleteSession } from '@/hooks';
import { LogOut } from '../svgs';
import { Profile as TProfile } from '../../services/queries/profile/types';

interface IProps {
  setShowSidebar?: React.Dispatch<React.SetStateAction<boolean>>;
  type?: 'header' | 'sidebar';
  data?: TProfile;
}

export function Profile(props: IProps) {
  const { setShowSidebar = () => null, type = 'header', data = {} as TProfile } = props;

  const profileImage = getProfileImage(data);
  const { logout } = useAdminDeleteSession();

  const isHeader = type === 'header';
  const isSidebar = type === 'sidebar';

  const name = (
    <h6 className="Articulat-Semibold text-capitalize">
      {data.firstName}
      {' '}
      {data.lastName}
    </h6>
  );

  return (
    <div className="app__dashboard_layout__header__profile">
      {isHeader && (
        <>
          <Image
            className="app__dashboard_layout__header__profile__img"
            height={40}
            width={40}
            src={profileImage}
            alt=""
          />
          <div className="text tx_red d-none d-xl-block">{name}</div>
        </>
      )}

      {isSidebar && (
        <button type="button" onClick={logout} className="text-decoration-none bg-transparent border-0">
          <span className="text-danger ms-3">Logout</span>
          <LogOut className="cursor-pointer ms-1" />
        </button>
      )}

      {type === 'header' && (
        <span
          role="none"
          onClick={() => setShowSidebar((prev) => !prev)}
          className="cursor-pointer d-block d-xl-none"
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
