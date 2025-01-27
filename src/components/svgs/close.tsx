import { SVGProps } from 'react';

export function Close(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M11 1L1 11M1 1L11 11" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function X(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1 1L11 11M1 11L11 1"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
