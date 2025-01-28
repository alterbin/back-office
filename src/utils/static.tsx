import React from 'react';
import {
  Home, Person, Team, Users, Transaction,
  Campaigns,
} from '../components/svgs';
import routes from './routes';

export const metaData = {
  siteName: 'Chop creat8 Admin',
  url: '',
  geo: {
    placeName: 'Lagos',
    position: '6.5474147;3.3639306',
    region: 'NG',
  },
  title: "Chopcr8 | Admin' Portal",
  description: 'An effective platform to manage digital influencer activities across Africa.',
  image: '',
  keywords: 'admin, chopcreate8, admin users, actist, musician, influencers',
};

const dbRoutes = routes.dashboard;

const getAdminRoutes = () => [
  { label: 'Given', href: routes.givens.path, icon: <Team /> },
  // { label: 'Profile', href: routes.profile.path, icon: <Person /> },
];

type SBRoute = {
  label: string;
  href: string;
  icon: React.JSX.Element;
  className?: string;
};

export const useSidebarRoutes = (): SBRoute[] => {
  return getAdminRoutes();
};

const routesExtras = [
  {
    label: 'Disputes',
    href: routes.campaigns.disputes.path,
    icon: <Campaigns />,
  },
  {
    label: 'Influencers',
    href: routes.users.influencers.path,
    icon: <Users />,
  },
];

export const GetRoutesMap = () => {
  const sidebarRoutes = useSidebarRoutes();

  let routesMap = {} as { [key: string]: ReturnType<() => (typeof sidebarRoutes)[2]> };

  [...sidebarRoutes, ...routesExtras].forEach((item) => {
    routesMap = { ...routesMap, [item.href]: item };
  });

  return routesMap;
};

export const matchRoute = (pathname: string, routesMap: { [key: string]: any }) => {
  return Object.keys(routesMap).find((route) => pathname.includes(route)) || '' as string;
};

export const matchLastRoute = (pathname: string, routesMap: { [key: string]: any }) => {
  let lastMatchedRoute: string = '';

  Object.keys(routesMap).forEach((route) => {
    if (pathname.includes(route)) {
      lastMatchedRoute = route;
    }
  });

  return lastMatchedRoute;
};

export const genders = {
  male: 'MALE',
  female: 'FEMALE',
};
