import { instance } from '../../client';
import { ConfigType } from '../../../types/configType';
import { ConfigResponse } from '../../../types/apiResource';

export const createConfig = (data: ConfigType): Promise<ConfigResponse> => {
  return instance.post('/configs/', {
    payload: data,
  });
};
