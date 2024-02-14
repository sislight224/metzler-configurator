import { OptionsParams, Options } from '../types';

export interface Store {
  getOption: <T extends OptionsParams>(code: Options) => T;
  setOption: (code: Options, options: OptionsParams) => void;
}
