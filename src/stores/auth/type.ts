export interface LoginInfo {
  userId: string;
  userPassword: string;
}

export interface User {
  accessToken: string;
  refreshToken: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}
