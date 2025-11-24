import React from 'react';
import { Add } from '../svgs';

interface IProps {
  action: (arg: any) => void;
  title: string;
}

export const AddButton: React.FC<IProps> = ({ action, title }) => {
  return (
    <button
      type="button"
      onClick={action}
      className="app__add__button flex my-auto !text-[#465fff]"
    >
      <div className="my-auto">

        <Add fillColor="#465fff" />
      </div>
      {' '}
      {title}
    </button>
  );
};
