import { useQuery } from "@apollo/client";
import Layout from "../../layouts/Layout";
import ProductCard from "../../elements/ProductCard";
import { IProductList } from "../../../_types_/db";
import { PRODUCT_LIST_QUERY } from "../../../_types_/gql";

const ProductList = () => {
  const { data: productList } = useQuery<IProductList>(PRODUCT_LIST_QUERY);
  return (
    <Layout>
      {productList?.products
        .slice(0)
        .reverse()
        .map(
          ({
            id,
            title,
            description,
            price,
            posted,
            views,
            category_product,
          }) => {
            return (
              <ProductCard
                key={id}
                id={id}
                title={title}
                description={description}
                price={price}
                posted={posted}
                views={views}
                category={category_product
                  .map((category_product) => category_product.category.name)
                  .join(", ")}
              />
            );
          }
        )}
    </Layout>
  );
};

export default ProductList;
