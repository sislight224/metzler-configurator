import { OptionCalculator } from '../../domain';
import { Options, TextleisteOptionParams } from '../types';
import { PriceStore } from '../price-store';

export class TextleisteOptionStrategy extends OptionCalculator<TextleisteOptionParams, Options> {
  public priceStore: PriceStore;

  constructor(priceStore: PriceStore) {
    super({
      textleiste: 0,
      led: 0,
    }, 'Textleiste');
    this.priceStore = priceStore;
  }

  public changeCountModulesOptions(options: TextleisteOptionParams) {
    const optionsPrices = this.priceStore.getOption<TextleisteOptionParams>('Textleiste');
    Object.keys(options).forEach((key) => {
      const summary = options[key as keyof TextleisteOptionParams];
      const param = key as keyof TextleisteOptionParams;
      const price = optionsPrices[param];
      this.summaryOptionPrice += price * summary;
    });
  }
}
