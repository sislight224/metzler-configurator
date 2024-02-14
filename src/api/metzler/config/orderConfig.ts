import { instance } from '../../client';
import { ConfigResponse } from '../../../types/apiResource';

export const orderConfig = (configId: string): Promise<ConfigResponse> => {
  return instance.post(`/configs/${configId}/order`);
};
