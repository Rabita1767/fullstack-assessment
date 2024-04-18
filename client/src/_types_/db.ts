export interface IProductList {
  allProducts: {
    id: number;
    title: string;
    description: string;
    price: number;
    posted: number;
    views: number;
    category_product: {
      category: {
        name: string;
      };
    }[];
  }[];
}
