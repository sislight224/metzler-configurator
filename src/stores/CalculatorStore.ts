import { makeAutoObservable } from 'mobx';
import { CalculatorFacade } from '../modules/price-calculator/application';
import { OptionsParams, Options } from '../modules/price-calculator/interfaces';
import { Price } from '../modules/price-calculator/domain';

export default class CalculatorStore {
  private calculatorModule: CalculatorFacade;

  public priceConfiguration: Price = 0;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    this.calculatorModule = new CalculatorFacade();
  }

  public countPriceOptions(code: Options, options: OptionsParams): void {
    this.calculatorModule.countSummaryPrice(code, options);
    this.priceConfiguration = this.calculatorModule.getSummaryPrice();
  }
}
