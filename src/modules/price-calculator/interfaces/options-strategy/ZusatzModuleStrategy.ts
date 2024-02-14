import { OptionCalculator } from '../../domain';
import { Options, ZusatzModuleOptionParams } from '../types';
import { PriceStore } from '../price-store';

export class ZusatzModuleStrategy extends OptionCalculator<ZusatzModuleOptionParams, Options> {
  public priceStore: PriceStore;

  constructor(priceStore: PriceStore) {
    super({
      AudioGegensprechmodul: 0,
      Videogegensprechmodul: 0,
      ohne: 0,
      Klingelanlagene: 0,
    }, 'ZusatzModule');
    this.priceStore = priceStore;
  }

  public changeCountModulesOptions(options: ZusatzModuleOptionParams) {
    const optionsPrices = this.priceStore.getOption<ZusatzModuleOptionParams>('ZusatzModule');
    Object.keys(options).forEach((key) => {
      const summary = options[key as keyof ZusatzModuleOptionParams];
      const param = key as keyof ZusatzModuleOptionParams;
      const price = optionsPrices[param];
      this.summaryOptionPrice += price * summary;
    });
  }
}
