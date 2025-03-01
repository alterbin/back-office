/* eslint-disable react/button-has-type */
import { HTMLProps, ReactNode } from 'react';
import "./styles.scss"

interface IProps extends Omit<HTMLProps<HTMLButtonElement>, 'size'> {
  children?: ReactNode;
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'tertiary-gray';
  size?: 'xl' | 'lg' | 'md';
  title?: string;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'contained' | 'outlined' | 'text';
  className?: string;
  isLoading?: boolean;
}

export const Button = (props: IProps) => {
  const {
    children, color = 'primary', variant = 'contained', title, type = 'button', className = '',
    isLoading, disabled, size = 'xl', ...restProps
  } = props;

  const btnClassName = `app_button app_button--${size} app_button--${color} app_button--${variant}--${color} app_button--${variant} ${disabled ? 'app_button--disabled' : ''} ${className} `;


  if (isLoading) {
    return (
      <button className={btnClassName} disabled={isLoading} type={type}>Loading...</button>
    );
  }

  return (
    <button className={btnClassName} disabled={disabled} type={restProps.onClick ? 'button' : type} {...restProps}>
      {children || <span>{title}</span>}
    </button>
  );
};
