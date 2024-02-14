import { OptionCalculator } from '../../domain';
import { Options, MontageOptionParams } from '../types';
import { PriceStore } from '../price-store';

export class MontageStrategy extends OptionCalculator<MontageOptionParams, Options> {
  public priceStore: PriceStore;

  constructor(priceStore: PriceStore) {
    super({
      anschrauben: 0,
      aufputz: 0,
      einbetonieren: 0,
    }, 'Montage');
    this.priceStore = priceStore;
  }

  public changeCountModulesOptions(options: MontageOptionParams) {
    const optionsPrices = this.priceStore.getOption<MontageOptionParams>('Montage');
    Object.keys(options).forEach((key) => {
      const summary = options[key as keyof MontageOptionParams];
      const param = key as keyof MontageOptionParams;
      const price = optionsPrices[param];
      this.summaryOptionPrice += price * summary;
    });
  }
}
