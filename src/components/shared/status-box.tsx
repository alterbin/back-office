import React from 'react';

interface StatusProps {
  status: string;
}

export const Status = ({ status }: StatusProps) => {
  if (!status) return '--';
  const stats = status.toLowerCase();

  let className = 'app__status__box';

  if (stats === 'approved' || stats === 'completed' || stats === 'active' || stats === 'resolved') {
    className += '__Approved';
  } else if (stats === 'rejected' || stats === 'failed' || stats === 'inactive') {
    className += '__Rejected';
  } else {
    className += '__Pending';
  }

  return (
    <button type="button" className={`app__status__box ${className}`}>
      {stats.split('-').join(' ')}
    </button>
  );
};
