import React from "react";
import {
  Home,
  Person,
  Team,
  Users,
  Transaction,
  Campaigns,
} from "../components/svgs";
import routes from "./routes";

export const metaData = {
  siteName: "Philan Admin",
  url: "",
  geo: {
    placeName: "Lagos",
    position: "6.5474147;3.3639306",
    region: "NG",
  },
  title: "Philan | Admin' Portal",
  description:
    "An effective platform to manage the activities of people who are willing to help others by giving out needs across Africa.",
  image: "",
  keywords:
    "admin, philan, admin users, philantropist, givens, giving, helping hands",
};

const getAdminRoutes = () => [
  { label: "Given", href: routes.givens.path, icon: <Team /> },
  { label: "Interest", href: routes.interest.path, icon: <Person /> },
  { label: "Collections", href: routes.collections.path, icon: <Home /> },
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
    label: "Disputes",
    href: routes.users.path,
    icon: <Campaigns />,
  },
  {
    label: "Influencers",
    href: routes.users.influencers.path,
    icon: <Users />,
  },
];

export const GetRoutesMap = () => {
  const sidebarRoutes = useSidebarRoutes();

  let routesMap = {} as {
    [key: string]: ReturnType<() => (typeof sidebarRoutes)[2]>;
  };

  [...sidebarRoutes, ...routesExtras].forEach((item) => {
    routesMap = { ...routesMap, [item.href]: item };
  });

  return routesMap;
};

export const matchRoute = (
  pathname: string,
  routesMap: { [key: string]: any }
) => {
  return (
    Object.keys(routesMap).find((route) => pathname.includes(route)) ||
    ("" as string)
  );
};

export const matchLastRoute = (
  pathname: string,
  routesMap: { [key: string]: any }
) => {
  let lastMatchedRoute: string = "";

  Object.keys(routesMap).forEach((route) => {
    if (pathname.includes(route)) {
      lastMatchedRoute = route;
    }
  });

  return lastMatchedRoute;
};

export const genders = {
  male: "MALE",
  female: "FEMALE",
};
