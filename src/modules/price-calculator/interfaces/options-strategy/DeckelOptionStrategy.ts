import { OptionCalculator } from '../../domain';
import { Options, DeckelOptionParams } from '../types';
import { PriceStore } from '../price-store';

export class DeckelOptionStrategy extends OptionCalculator<DeckelOptionParams, Options> {
  public priceStore: PriceStore;

  constructor(priceStore: PriceStore) {
    super({
      deckel: 0,
    }, 'Deckel');
    this.priceStore = priceStore;
  }

  public changeCountModulesOptions(options: DeckelOptionParams) {
    const optionsPrices = this.priceStore.getOption<DeckelOptionParams>('Deckel');
    Object.keys(options).forEach((key) => {
      const summary = options[key as keyof DeckelOptionParams];
      const param = key as keyof DeckelOptionParams;
      const price = optionsPrices[param];
      this.summaryOptionPrice += price * summary;
    });
  }
}
