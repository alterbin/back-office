/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import Image from 'next/image';

interface BadgeProps {
  isSelected: boolean;
  imageUrl?: string;
  label: string | number;
  defaultValue?: boolean;
  onClick: () => void;
}

export const Badge: React.FC<BadgeProps> = (props) => {
  const {
    isSelected, imageUrl, label, onClick, defaultValue,
  } = props;

  const badgeClass = isSelected || defaultValue
    ? 'd-inline-flex align-items-center py-2 px-3 rounded-pill text-xs fw-medium cursor-pointer badge--selected'
    : 'd-inline-flex align-items-center py-2 px-3 rounded-pill text-xs fw-medium cursor-pointer';

  return (
    <div>
      {imageUrl ? (
        <div className={badgeClass} onClick={onClick}>
          <span className="flex-shrink-0 me-1">
            <Image
              src={imageUrl}
              alt={String(label)}
              width={16}
              height={16}
              className="rounded-circle"
            />
          </span>
          <span className="badge__label text-truncate">{label}</span>
        </div>
      ) : (
        <label className="d-inline-flex align-items-center cursor-pointer me-2">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={onClick}
            className="custom-checkbox me-1"
            aria-checked={isSelected}
          />
          <span className="badge__label text-truncate">{label}</span>
        </label>
      )}
    </div>
  );
};
