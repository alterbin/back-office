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
    <div className={`form-group ${className || ''}`}>
      {!!label && <label className={`font-semibold ${error ? 'text-red-800' : ''}`} htmlFor={htmlFor}>{label}</label>}

      <div className="relative">
        <input
          type={show ? 'text' : type || 'text'}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          className={error ? 'form-control border-red-800' : 'form-control'}
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
        <p className="text-black app__auth__input_con__error" style={{ lineHeight: 'normal', opacity: 0.8 }}>
          {helperText}
        </p>
      )}

      {!!error && (
        <p className="text-red-800 app__auth__input_con__error">{error}</p>
      )}
    </div>
  );
}