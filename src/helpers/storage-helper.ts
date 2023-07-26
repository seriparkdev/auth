const ACCESS_TOKEN = 'accessToken';
const REFRESH_TOKEN = 'refreshToken';

export const setAccessToken = (accessToken: string) => {
  sessionStorage.setItem(ACCESS_TOKEN, accessToken);
};

export const setRefreshToken = (refreshToken: string) => {
  sessionStorage.setItem(REFRESH_TOKEN, refreshToken);
};

export const getAccessToken = () => {
  return sessionStorage.getItem(ACCESS_TOKEN);
};

export const getRefreshToken = () => {
  return sessionStorage.getItem(REFRESH_TOKEN);
};

export const removeAccessToken = () => {
  sessionStorage.removeItem(ACCESS_TOKEN);
};

export const removeRefreshToken = () => {
  sessionStorage.removeItem(REFRESH_TOKEN);
};
