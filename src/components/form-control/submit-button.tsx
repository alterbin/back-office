/* eslint-disable react/button-has-type */
import { HTMLProps, ReactNode } from 'react';

interface IProps extends Omit<HTMLProps<HTMLButtonElement>, 'size'> {
  children?: ReactNode;
  color?: 'pink' | 'success';
  size?: 'lg' | 'md';
  title?: string;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'outline';
  className?: string;
  isLoading?: boolean;
}

export const SubmitButton = (props: IProps) => {
  const {
    children, color = '', title, type = 'submit', variant, className = '',
    isLoading, disabled, size = 'lg', ...restProps
  } = props;

  let btnClassName = `btn app__auth__button_con btn_size_${size} ${className} btn_${color} `;

  if (variant === 'outline') {
    btnClassName += ' btn_outline';
  }

  const spinner = (
    <div className="flex">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <button className={btnClassName} disabled={isLoading} type={type}>{spinner}</button>
    );
  }

  return (
    <button className={btnClassName} disabled={disabled} type={restProps.onClick ? 'button' : type} {...restProps}>
      {children || title}
    </button>
  );
};
