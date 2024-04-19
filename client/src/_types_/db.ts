export interface IProductList {
  myProducts: {
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
    user: {
      id: string;
    };
  }[];
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
    user: {
      id: string;
    };
  }[];
}
