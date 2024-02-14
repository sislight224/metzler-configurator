import { OptionCalculator } from '../../domain';
import { Options, BriefkastenOptionParams } from '../types';
import { PriceStore } from '../price-store';

export class BriefkastenOptionStrategy extends OptionCalculator<BriefkastenOptionParams, Options> {
  public priceStore: PriceStore;

  constructor(priceStore: PriceStore) {
    super({
      papper: 0,
      gravur: 0,
    }, 'Briefkasten');
    this.priceStore = priceStore;
  }

  public changeCountModulesOptions(options: BriefkastenOptionParams) {
    const optionsPrices = this.priceStore.getOption<BriefkastenOptionParams>('Briefkasten');
    Object.keys(options).forEach((key) => {
      const summary = options[key as keyof BriefkastenOptionParams];
      const param = key as keyof BriefkastenOptionParams;
      const price = optionsPrices[param];
      this.summaryOptionPrice += price * summary;
    });
  }
}
