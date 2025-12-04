export interface LoginResponse {
  success: boolean;
  message: string;
  data: LoginData;
}

export interface LoginData {
  user: User;
  accessToken: string;
  refreshToken: string;
  accessJti: string;
  refreshJti: string;
}

export interface User {
  id: string;
  email: string;
  username: string;
}
