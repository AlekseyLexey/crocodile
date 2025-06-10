export interface IApiResponse<T = null> {
  statusCode: number;
  message: string;
  data: T;
}
