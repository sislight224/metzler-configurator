import { ConfigType } from './configType';

export interface ConfigResponse {
  $resourceType: string;
  id: string;
  payload: ConfigType;
  status: string;
  createdAt: string;
  orderedAt: string;
  updatedAt: string;
  parentId: string;
}
