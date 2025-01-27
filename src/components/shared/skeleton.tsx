import { HTMLProps } from 'react';

interface IProps extends HTMLProps<HTMLDivElement> {}

export function Skeleton(props: IProps) {
  const { className = '', ...restProps } = props;

  return <div className={`app_skeleton app_component ${className}`} {...restProps} />;
}
