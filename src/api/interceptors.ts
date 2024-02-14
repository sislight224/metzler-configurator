import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

export type ApiRequestError = AxiosError<{
  code: number;
  message: string;
  statusCode: number;
}>;

export const onResponsePrepare = (response: AxiosResponse): AxiosResponse => {
  return response.data;
};

export const onRequestPrepare = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  return config;
};

export const onRequestError = (error: ApiRequestError): Promise<AxiosError> => {
  return Promise.reject(error);
};

export const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};
