'use client';

import React from 'react';
import { Button, TextInput } from '@/components';
import { getProfileImage } from '@/utils';
import Image from 'next/image';
import { profileQueries } from '@/services/queries';
import { useModals } from '@/contexts/modals';

export const Profile = () => {
  const { data } = profileQueries.Read();
  const profileImage = getProfileImage(data);
  const { setModals } = useModals();

  const handleOpen = () => {
    setModals((prev) => ({ ...prev, show: true, record: data }));
  };

  const handlePasswordOpen = () => {
    setModals((prev) => ({ ...prev, edit: true }));
  };

  return (
    <div className="profile__container">
      {!data ? (
        'Something went wrong ...'
      ) : (
        <div>
          <div className="profile__details">
            <div className="profile__details__img__con">
              <Image
                className="profile__details__img"
                height={40}
                width={40}
                src={profileImage}
                alt=""
              />
              <div className="text tx_red profile__details__name">
                <h6 className="Articulat-Semibold text-capitalize">
                  {data?.firstName}
                  {' '}
                  {data?.lastName}
                </h6>
              </div>
            </div>
            <div className="profile__form">
              <TextInput
                name="firstName"
                label="First name"
                value={data?.firstName}
                type="text"
                disabled
              />
              <TextInput
                label="Last Name"
                name="lastName"
                value={data?.lastName}
                type="text"
                disabled
              />
              <TextInput label="Email" name="email" value={data?.email} type="text" disabled />

              <div className="profile__form-group">
                <Button onClick={handlePasswordOpen} size="xl" variant="outlined">
                  Change Password
                </Button>
                <Button size="xl" onClick={handleOpen}>
                  Edit Profile
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
