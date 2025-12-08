import axios, { AxiosInstance } from "axios";
import { getRefreshToken, saveTokens, clearTokens } from "../storage/TokenStorage";
import { useAuthViewModel } from "../../feature/auth/AuthViewModel";

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

export const attachInterceptors = (api: AxiosInstance) => {
  api.interceptors.request.use((config) => {
    const token = useAuthViewModel.getState().accessToken;
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = await getRefreshToken();

        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        const response = await axios.post(
          "http://localhost:4000/auth/refresh-token",
          { refreshToken }
        );

        const newData = response.data.data;

        await saveTokens({
          accessToken: newData.accessToken,
          refreshToken: newData.refreshToken,
        });

        useAuthViewModel.getState().setAuth(newData);

        api.defaults.headers.Authorization =
          `Bearer ${newData.accessToken}`;

        processQueue(null, newData.accessToken);

        return api(originalRequest);

      } catch (err) {
        processQueue(err, null);
        await clearTokens();
        useAuthViewModel.getState().logout();
        return Promise.reject(err);

      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
};
