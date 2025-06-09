export interface IUserAuthData {
  username: string;
  email: string;
  password: string;
}

export interface IUser {
  id: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface IAuthResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}
