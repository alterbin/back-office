import { SVGProps } from 'react';

export function Transaction(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M4 4H20M4 4L7 7M4 4L7 1M20 20H4M20 20L17 17M20 20L17 23M12 11H7M7 11L10 8M7 11L10 14M17 13H12M17 13L14 10M17 13L14 16"
        stroke="#7155A3"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
