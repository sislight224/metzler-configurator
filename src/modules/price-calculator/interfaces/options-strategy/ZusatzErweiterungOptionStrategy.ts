import { OptionCalculator } from '../../domain';
import { Options, ZusatzErweiterungOptionParams } from '../types';
import { PriceStore } from '../price-store';

export class ZusatzErweiterungOptionStrategy extends OptionCalculator<ZusatzErweiterungOptionParams, Options> {
  public priceStore: PriceStore;

  constructor(priceStore: PriceStore) {
    super({
      EinsteckschildmitPapiereinleger: 0,
      Klingeltaster: 0,
      Lichttaster: 0,
      NamensschildmitBeleuchtung: 0,
      RFID: 0,
      NamensschildmitGravur: 0,
      TouchDisplay: 0,
    }, 'ZusatzErweiterung');
    this.priceStore = priceStore;
  }

  public changeCountModulesOptions(options: ZusatzErweiterungOptionParams) {
    const optionsPrices = this.priceStore.getOption<ZusatzErweiterungOptionParams>('ZusatzErweiterung');
    Object.keys(options).forEach((key) => {
      const summary = options[key as keyof ZusatzErweiterungOptionParams];
      const param = key as keyof ZusatzErweiterungOptionParams;
      const price = optionsPrices[param];
      this.summaryOptionPrice += price * summary;
    });
  }
}
