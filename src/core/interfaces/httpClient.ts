import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export interface IResponse<T = any> {
  data?: T;
  statusCode?: number | string;
  success: boolean;
  error: boolean;
  message?: string;
  rawResponse?: AxiosResponse;
}

export interface ExtendedAxiosRequestConfig extends AxiosRequestConfig {
  offNotify?: boolean;
  offRefreshToken?: boolean;
  noTransform?: boolean;
}

export type ResolveResponseType<C extends ExtendedAxiosRequestConfig, T> = C extends { noTransform: true }
  ? Promise<AxiosResponse<T>>
  : Promise<IResponse<T>>;

type QueryMethod = <T = any, C extends ExtendedAxiosRequestConfig = ExtendedAxiosRequestConfig>(
  url: string,
  config?: C,
) => Promise<ResolveResponseType<C, T>>;

type MutationMethod = <T = any, C extends ExtendedAxiosRequestConfig = ExtendedAxiosRequestConfig>(
  url: string,
  data?: any,
  config?: C,
) => Promise<ResolveResponseType<C, T>>;

export interface ExtendedAxiosInstance extends Omit<
  AxiosInstance,
  'request' | 'get' | 'delete' | 'head' | 'options' | 'post' | 'put' | 'patch'
> {
  request<T = any, C extends ExtendedAxiosRequestConfig = ExtendedAxiosRequestConfig>(
    config: C,
  ): Promise<ResolveResponseType<C, T>>;

  get: QueryMethod;
  delete: QueryMethod;
  head: QueryMethod;
  options: QueryMethod;

  post: MutationMethod;
  put: MutationMethod;
  patch: MutationMethod;
}
