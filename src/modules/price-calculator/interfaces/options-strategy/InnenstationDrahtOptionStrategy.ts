import { OptionCalculator } from '../../domain';
import { Options, InnenstationDrahtOptionParams } from '../types';
import { PriceStore } from '../price-store';

export class InnenstationDrahtOptionStrategy extends OptionCalculator<InnenstationDrahtOptionParams, Options> {
  public priceStore: PriceStore;

  constructor(priceStore: PriceStore) {
    super({
      InnenstationHomeSchwarzDraht: 0,
      InnenstationHomeWeibDraht: 0,
    }, 'InnenstationDraht');
    this.priceStore = priceStore;
  }

  public changeCountModulesOptions(options: InnenstationDrahtOptionParams) {
    const optionsPrices = this.priceStore.getOption<InnenstationDrahtOptionParams>('InnenstationDraht');
    Object.keys(options).forEach((key) => {
      const summary = options[key as keyof InnenstationDrahtOptionParams];
      const param = key as keyof InnenstationDrahtOptionParams;
      const price = optionsPrices[param];
      this.summaryOptionPrice += price * summary;
    });
  }
}
