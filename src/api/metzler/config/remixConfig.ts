import { instance } from '../../client';
import { ConfigResponse } from '../../../types/apiResource';

export const remixConfig = (configId: string): Promise<ConfigResponse> => {
  return instance.post(`/configs/${configId}/remix`);
};
