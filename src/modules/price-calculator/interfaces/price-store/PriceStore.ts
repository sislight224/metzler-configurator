import { Store } from './Store';
import { OptionsParams, Options } from '../types';
import { prices } from '../../db/prices';

export class PriceStore implements Store {
  private optionPrices: Record<string, OptionsParams> = prices;

  public getOption<T>(code: Options): T {
    if (this.optionPrices) {
      return this.optionPrices[code] as T;
    }
    throw Error('options strategy not found');
  }

  public setOption(code: Options, options: OptionsParams): void {
    this.optionPrices = {
      ...this.optionPrices,
      [code]: options,
    };
  }
}
