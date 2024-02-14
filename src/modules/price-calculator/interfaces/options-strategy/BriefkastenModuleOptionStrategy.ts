import { OptionCalculator } from '../../domain';
import { Options, BriefkastenModuleOptionParams } from '../types';
import { PriceStore } from '../price-store';

export class BriefkastenModuleOptionStrategy extends OptionCalculator<BriefkastenModuleOptionParams, Options> {
  public priceStore: PriceStore;

  constructor(priceStore: PriceStore) {
    super({
      blindModules: 0,
      briefcastenModules: 0,
    }, 'BriefkastenModule');
    this.priceStore = priceStore;
  }

  public changeCountModulesOptions(options: BriefkastenModuleOptionParams) {
    const optionsPrices = this.priceStore.getOption<BriefkastenModuleOptionParams>('BriefkastenModule');
    Object.keys(options).forEach((key) => {
      const summary = options[key as keyof BriefkastenModuleOptionParams];
      const param = key as keyof BriefkastenModuleOptionParams;
      const price = optionsPrices[param];
      this.summaryOptionPrice += price * summary;
    });
  }
}
