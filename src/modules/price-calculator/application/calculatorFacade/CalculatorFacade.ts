import { CalculationOptionFactory, OptionsParams, Options } from '../../interfaces';
import { Price } from '../../domain';

export class CalculatorFacade {
  private _optionFactory: CalculationOptionFactory;

  private _summaryPrice: Record<string, Price> = {};

  constructor() {
    this._optionFactory = new CalculationOptionFactory();
  }

  public countSummaryPrice(code: Options, options: OptionsParams): void {
    const strategy = this._optionFactory.applyStrategy(code);
    strategy.changeCountModulesOptions(options);

    this._summaryPrice[code] = strategy.summaryOptionPrice;
  }

  public getSummaryPrice(): Price {
    const priceList = Object.values(this._summaryPrice);
    let summaryPrice = 0;
    priceList.forEach((item) => {
      summaryPrice += item;
    });

    return summaryPrice;
  }
}
