import { SVGProps } from 'react';

export function ActionsIcon({ stroke = '#7155A3', ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="15"
      height="17"
      viewBox="0 0 15 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="7.5" cy="4.25" r="1.25" fill={stroke} />
      <circle cx="7.5" cy="8.5" r="1.25" fill={stroke} />
      <circle cx="7.5" cy="12.75" r="1.25" fill={stroke} />
    </svg>
  );
}
