import { SVGProps } from 'react';

export function Approve(props: SVGProps<SVGSVGElement>) {
  const {
    stroke = '#537DBF', width, height, ...rest
  } = props;

  return (
    <svg
      width={width || '23'}
      height={height || '23'}
      viewBox="0 0 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M5 12.5L9 16.5L18 7.5"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="11.5"
        cy="11.5"
        r="10.5"
        stroke={stroke}
        strokeWidth="2"
      />
    </svg>
  );
}
