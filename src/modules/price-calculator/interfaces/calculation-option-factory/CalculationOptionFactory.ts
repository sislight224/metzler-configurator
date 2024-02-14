import { Options, OptionsParams } from '../types';
import { PriceStore } from '../price-store';
import { OptionCalculator } from '../../domain';
import {
  RFIDOptionStrategy,
  BriefkastenOptionStrategy,
  InnenstationLANPOEOptionStrategy,
  TextleisteOptionStrategy,
  BriefkastenModuleOptionStrategy,
  InnenstationDrahtOptionStrategy,
  ZusatzModuleStrategy,
  DeckelOptionStrategy,
  MontageStrategy,
  ZusatzErweiterungOptionStrategy,
} from '../options-strategy';

export class CalculationOptionFactory {
  private priceStore: PriceStore = new PriceStore();

  public applyStrategy(code: Options): OptionCalculator<OptionsParams, Options> {
    switch (code) {
      case 'Montage':
        return new MontageStrategy(this.priceStore);
      case 'ZusatzModule':
        return new ZusatzModuleStrategy(this.priceStore);
      case 'Textleiste':
        return new TextleisteOptionStrategy(this.priceStore);
      case 'Briefkasten':
        return new BriefkastenOptionStrategy(this.priceStore);
      case 'BriefkastenModule':
        return new BriefkastenModuleOptionStrategy(this.priceStore);
      case 'Deckel':
        return new DeckelOptionStrategy(this.priceStore);
      case 'InnenstationDraht':
        return new InnenstationDrahtOptionStrategy(this.priceStore);
      case 'InnenstationLANPOE':
        return new InnenstationLANPOEOptionStrategy(this.priceStore);
      case 'RFID':
        return new RFIDOptionStrategy(this.priceStore);
      case 'ZusatzErweiterung':
        return new ZusatzErweiterungOptionStrategy(this.priceStore);
      default: throw new Error('strategy not found');
    }
  }
}
