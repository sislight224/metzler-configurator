import { Price, SignOptions } from '../types';

export abstract class OptionCalculator<T, K> {
  protected options: T;

  protected code: K;

  public summaryOptionPrice: Price = 0;

  protected constructor(options: T, code: K) {
    this.options = options;
    this.code = code;
  }

  public changePrice(price: Price, sign: SignOptions): void {
    if (sign === 'plus') {
      this.summaryOptionPrice += price;
    } else if (sign === 'minus') {
      this.summaryOptionPrice -= price;
    }
    this.throwNegativePrice();
  }

  private throwNegativePrice() {
    if (this.summaryOptionPrice < 0) {
      throw Error('the product-price is less than 0 increase the value');
    }
  }

  public abstract changeCountModulesOptions(options: T): void;
}
