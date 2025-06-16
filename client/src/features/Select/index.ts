export interface ITheme {
  id: number;
  name: string;
}

export interface IApiResponse<T = null> {
  statusCode: number;
  message: string;
  data: T;
}
