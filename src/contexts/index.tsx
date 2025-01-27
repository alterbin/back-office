import React from 'react';
import { ModalsProvider } from './modals';

interface IProps {
  children: any;
}

const AppProvider = (props: IProps) => {
  const { children } = props;

  return (
    // alternative option is to wrapper provider in page or layout that needs it
    <ModalsProvider>
      {children}
    </ModalsProvider>
  );
};

export { AppProvider };
