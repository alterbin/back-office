import { SVGProps } from 'react';

export function Home(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="20" height="23" viewBox="0 0 20 23" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M7 21.2188V11.2188H13V21.2188M1 8.21875L10 1.21875L19 8.21875V19.2188C19 19.7492 18.7893 20.2579 18.4142 20.633C18.0391 21.008 17.5304 21.2188 17 21.2188H3C2.46957 21.2188 1.96086 21.008 1.58579 20.633C1.21071 20.2579 1 19.7492 1 19.2188V8.21875Z" stroke="#7155A3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
