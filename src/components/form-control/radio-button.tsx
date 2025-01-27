import React, { ReactNode } from 'react';

interface IProps extends React.HTMLProps<HTMLInputElement> {
  name?: string;
  label?: string;
  htmlFor?: string;
  error?: string;
  className?: string;
  children?: ReactNode;
}

export function RadioButton(props: IProps) {
  const {
    label, htmlFor, name, onChange, error, className,
    children, ...restProps
  } = props;

  return (
    <div className={`form-check ${className || ''}`}>
      <input
        type="radio"
        name={name}
        onChange={onChange}
        className={error ? 'form-check-input border-danger' : 'form-check-input'}
        {...restProps}
      />

      {(!!label || children) && (
        <label className={error ? 'form-check-label text-danger' : 'form-check-label'} htmlFor={htmlFor}>
          {children || label}
        </label>
      )}

      {!!error && (
        <p className="text-danger">{error}</p>
      )}
    </div>
  );
}
