import { instance } from '../../client';
import { ConfigResponse } from '../../../types/apiResource';

export const getConfig = (configId: string): Promise<ConfigResponse> => {
  return instance.get(`/configs/${configId}`);
};
