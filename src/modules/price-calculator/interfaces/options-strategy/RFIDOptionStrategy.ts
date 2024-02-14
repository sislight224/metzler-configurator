import { OptionCalculator } from '../../domain';
import { Options, RFIDOptionParams } from '../types';
import { PriceStore } from '../price-store';

export class RFIDOptionStrategy extends OptionCalculator<RFIDOptionParams, Options> {
  public priceStore: PriceStore;

  constructor(priceStore: PriceStore) {
    super({
      exclusiveCard: 0,
      regularCard: 0,
    }, 'RFID');
    this.priceStore = priceStore;
  }

  public changeCountModulesOptions(options: RFIDOptionParams) {
    const optionsPrices = this.priceStore.getOption<RFIDOptionParams>('RFID');
    Object.keys(options).forEach((key) => {
      const summary = options[key as keyof RFIDOptionParams];
      const param = key as keyof RFIDOptionParams;
      const price = optionsPrices[param];
      this.summaryOptionPrice += price * summary;
    });
  }
}
