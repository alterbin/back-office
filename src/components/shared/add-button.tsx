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
      className="app__add__button flex my-auto"
    >
      <div className="my-auto">

        <Add fillColor="#CC1717" />
      </div>
      {' '}
      {title}
    </button>
  );
};
