import { createContext } from "react";

export type Product = {
  configuratorId: number;
  articleNumber: number;
  title: string;
  description: string;
  price: string;
  dimensions: string;
  extraFieldId: null | number;
};

export const ProductsContext = createContext({} as { products: Product[] });

export const ProductsProvider = ({ children, products }) => {
  console.log({ products });
  return (
    <ProductsContext.Provider value={{ products }}>
      {children}
    </ProductsContext.Provider>
  );
};
