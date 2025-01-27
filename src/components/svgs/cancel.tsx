import { SVGProps } from 'react';

export function Cancel(props: SVGProps<SVGSVGElement>) {
  const {
    stroke = '#537DBF', width, height, ...rest
  } = props;

  return (
    <svg width={width || '23'} height={height || '23'} viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <path
        d="M3 3L20 20M20 3L3 20"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
