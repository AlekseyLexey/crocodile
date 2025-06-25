export interface IUserAuthData {
  username: string;
  email: string;
  password: string;
}

export interface IUser {
  id: number;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  point: number
}

export interface IAuthResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}
