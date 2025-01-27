import React, { useState } from 'react';
import { LockIcon, UnLockIcon } from '../svgs';

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
      {!!label && <label className={error ? 'text-danger' : ''} htmlFor={htmlFor}>{label}</label>}

      <div className="position-relative">
        <input
          type={show ? 'text' : type || 'text'}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          className={error ? 'form-control border-danger' : 'form-control'}
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
        <p className="text-dark app__auth__input_con__error" style={{ lineHeight: 'normal', opacity: 0.8 }}>
          {helperText}
        </p>
      )}

      {!!error && (
        <p className="text-danger app__auth__input_con__error">{error}</p>
      )}
    </div>
  );
}
