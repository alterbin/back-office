const DEV_ORIGIN_URL = process.env.NEXT_PUBLIC_PROD_ORIGIN_URL || '';

const dev = {
  BASE_URL: `${DEV_ORIGIN_URL}`,
};

const PROD_ORIGIN_URL = process.env.NEXT_PUBLIC_PROD_ORIGIN_URL || '';

const prod = {
  BASE_URL: `${PROD_ORIGIN_URL}`,
};

const configs = { dev, prod };
const nodeEnv = process.env.NEXT_PUBLIC_ENV as 'dev' | 'prod';

const config = {
  tokenKey: 'tk-cdnio-cr',
  user: 'pu-gye5-cl',
  profileKey: 'hgtak-fjjf-pir',
  ...(configs[nodeEnv] || dev),
};

export default config;
