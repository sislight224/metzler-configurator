import { instance } from '../../client';
import { ConfigType } from '../../../types/configType';
import { ConfigResponse } from '../../../types/apiResource';

export const updateConfig = (configId: string, data: ConfigType): Promise<ConfigResponse> => {
  return instance.put(`/configs/${configId}`, {
    payload: data,
  });
};
