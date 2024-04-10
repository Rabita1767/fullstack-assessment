import { gql, useQuery } from "@apollo/client";
import Layout from "../../layouts/Layout";
import ProductCard from "../../elements/ProductCard";

const ProductList = () => {
  const PRODUCT_LIST_QUERY = gql`
    query Query {
      products {
        id
        title
        description
        price
        rent
        posted
        views
        status
        category {
          id
          name
        }
      }
    }
  `;
  const { data: productList } = useQuery(PRODUCT_LIST_QUERY);
  //   console.log(productList);
  return (
    <Layout>
      {productList?.products.map(
        ({ id, title, description, price, posted, views, category }) => {
          return (
            <ProductCard
              key={id}
              id={id}
              title={title}
              description={description}
              price={price}
              posted={posted}
              views={views}
              category={category.name}
            />
          );
        }
      )}
    </Layout>
  );
};

export default ProductList;
