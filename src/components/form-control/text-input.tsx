import React, { useState } from 'react';
import { LockIcon, UnLockIcon } from '../svgs';
import "./styles.scss";


export interface IProps extends React.HTMLProps<HTMLInputElement> {
  type?: React.HTMLInputTypeAttribute;
  name?: string;
  placeholder?: string;
  label?: string;
  htmlFor?: string;
  value?: any;
  helperText?: string;
  error?: string;
  className?: string;
  variant?: 'help';
}

export function TextInput(props: IProps) {
  const {
    type, label, htmlFor, name, placeholder, value, onChange, error, className,
    helperText,
    ...restProps
  } = props;

  const [show, setShow] = useState(false);

  return (
    <div className={`form-group !mb-0 !z-0 ${className || ''}`}>
      {!!label && <label className={`font-semibold pb-2 ${error ? 'text-red-800' : ''}`} htmlFor={htmlFor}>{label}</label>}

      <div className="relative">
        <input
          type={show ? 'text' : type || 'text'}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          className={error ? 'form-control border-red-800' : 'h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10'}
          {...restProps}
        />

        {type === 'password' && (
          <div>
            {show ? (
              <UnLockIcon
                onClick={() => setShow((prev) => !prev)}
              />
            ) : (
              <LockIcon
                onClick={() => setShow((prev) => !prev)}
              />
            )}
          </div>
        )}
      </div>

      {!!helperText && (
        <p className="text-black app__auth__input_con__error " style={{ lineHeight: 'normal', opacity: 0.8 }}>
          {helperText}
        </p>
      )}

      {!!error && (
        <p className="text-red-800 app__auth__input_con__error">{error}</p>
      )}
    </div>
  );
}