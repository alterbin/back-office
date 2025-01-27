import axios, {
  AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig,
} from 'axios';
import { getLocalStorage, saveLocalStorage } from '@/utils';
import routes from '@/utils/routes';
import config from '@/utils/config';

const baseURL = config.BASE_URL;

const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json, text/plain, */*',
  },
});

const refreshToken = async (originalRequest: AxiosRequestConfig) => {
  try {
    const token = getLocalStorage<{ refreshToken?: string }>(config.tokenKey);
    const url = `${baseURL}/Account/refresh-token?token=${token?.refreshToken}`;

    const { data, ...response } = await axios.post(url);

    if (data.status === 200) {
      // old request and save new token
      saveLocalStorage(data.data, config.tokenKey);

      if (originalRequest && originalRequest.headers) {
        (originalRequest.headers as any).Authorization = `Bearer ${data.data?.accessToken}`;
      }

      // console.log('testtt', axios(originalRequest));
      axios(originalRequest);

      return { data, ...response };
    }

    // window.location.href = `${routes.auth.logout.path}?next=${window.location.pathname}`;
    return Promise.reject(response);
  } catch (error) {
    return Promise.reject(error);
  }
};

const onRequest = (request: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const token = getLocalStorage<string>(config.tokenKey);

  if (!request.headers) return request;

  (request.headers! as any).Authorization = `Bearer ${token || ''}`;

  return request;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};

const onResponseError = async (error: AxiosError) => {
  const originalRequest = error.config as AxiosRequestConfig<any>;
  const statusCode = error?.response?.status;

  if (statusCode === 401 && window.location.pathname !== routes.home.path) {
    window.location.href = `${routes.home.path}?next=${window.location.pathname}`;
  }
  // eslint-disable-next-line no-constant-condition
  if (false && statusCode === 401) { // TODO:: handle refresh
    const response = await refreshToken(originalRequest);
    return response;
  }

  return Promise.reject(error);
};

// https://axios-http.com/docs/interceptors
axiosInstance.interceptors.request.use(onRequest, onRequestError);
axiosInstance.interceptors.response.use(onResponse, onResponseError);

export default axiosInstance;
