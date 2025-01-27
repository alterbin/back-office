import { SVGProps } from 'react';

export function MagnifyingGlass(props: SVGProps<SVGSVGElement>) {
  const {
    stroke = '#ED196F', width, height, ...rest
  } = props;
  return (
    <svg
      width={width || '22'}
      height={height || '22'}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M11 4.5a6.5 6.5 0 016.5 6.5 6.5 6.5 0 01-6.5 6.5A6.5 6.5 0 014.5 11 6.5 6.5 0 0111 4.5zm0 2a4.5 4.5 0 100 9 4.5 4.5 0 000-9zm6.72 10.28l3.28 3.28a.75.75 0 11-1.06 1.06l-3.28-3.28a.75.75 0 011.06-1.06z"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
