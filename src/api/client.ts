import axios, { AxiosError } from "axios";
import {
  onRequestError,
  onRequestPrepare,
  onResponseError,
  onResponsePrepare,
} from "./interceptors";

export type ApiRequestError = AxiosError<{
  code: number;
  message: string;
  statusCode: number;
}>;

export const instance = axios.create({
  baseURL: `/konfigurator/${process.env.NEXT_PUBLIC_API_PREFIX}`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.response.use(onResponsePrepare, onResponseError);
instance.interceptors.request.use(onRequestPrepare, onRequestError);
