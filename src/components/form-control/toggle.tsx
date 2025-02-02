import React from "react";

interface IToggle {
  label: string;
  id: string;
  name?: string;
  checked: boolean | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

export const Toggle: React.FC<IToggle> = (props) => {
  const { label, id, name, checked, onChange, disabled } = props;
  return (
    <div className="flex justify-between gap-2">
      <label className="text-main_black-10 font-medium mb-5 satoshi text-base">
        {label}
      </label>
      <div>
        <label
          className={`switch ${
            disabled ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          <input
            type="checkbox"
            id={id}
            name={name ? name : id}
            onChange={onChange}
            checked={Boolean(checked)}
            disabled={disabled}
          />
          <span className="slider"></span>
        </label>
      </div>
    </div>
  );
};
