const routes = {
  home: {
    path: "/",
  },

  auth: {
    path: "/auth",

    forgotPassword: {
      path: "/auth/forgot-password",
    },

    resetPassword: {
      path: "/auth/reset-password",
    },

    onboard: {
      path: "/auth/onboard",
    },

    verification: {
      path: "/auth/register/verification",
    },

    verificationStatus: {
      path: "/auth/register/verification-status",
    },
  },

  dashboard: {
    path: "/dashboard",
  },
  givens: {
    path: "/givens",
  },
  profile: {
    path: "/profile",
  },
  users: {
    path: "/users",
    brand: {
      path: "/users/brand",
    },
    influencers: {
      path: "/users/influencers",
    },
  },
  interest: {
    path: "/interests",
  },
  collections: {
    path: "/collections",
  },
};

export default routes;
