import { OptionCalculator } from '../../domain';
import { Options, InnenstationLANPOEOptionParams } from '../types';
import { PriceStore } from '../price-store';

export class InnenstationLANPOEOptionStrategy extends OptionCalculator<InnenstationLANPOEOptionParams, Options> {
  public priceStore: PriceStore;

  constructor(priceStore: PriceStore) {
    super({
      InnenstationHomeSchwarzLanPoe: 0,
      InnenstationHomeWeibLanPoe: 0,
      InnenstationProGrau: 0,
      InnenstationProSchwarzRose: 0,
      InnenstationUltraSchwarz: 0,
    }, 'InnenstationDraht');
    this.priceStore = priceStore;
  }

  public changeCountModulesOptions(options: InnenstationLANPOEOptionParams) {
    const optionsPrices = this.priceStore.getOption<InnenstationLANPOEOptionParams>('InnenstationLANPOE');
    Object.keys(options).forEach((key) => {
      const summary = options[key as keyof InnenstationLANPOEOptionParams];
      const param = key as keyof InnenstationLANPOEOptionParams;
      const price = optionsPrices[param];
      this.summaryOptionPrice += price * summary;
    });
  }
}
