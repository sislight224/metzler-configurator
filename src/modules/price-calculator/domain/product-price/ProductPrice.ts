import { Price } from '../types';

export interface ProductPriceOptions {
  name: string;
  price: Price;
}

export abstract class ProductPrice {
  public name: string;

  public price: Price;

  protected constructor({ name, price }: ProductPriceOptions) {
    this.name = name;
    this.price = price;
  }
}
