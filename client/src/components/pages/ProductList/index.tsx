import { useQuery } from "@apollo/client";
import Layout from "../../layouts/Layout";
import ProductCard from "../../elements/ProductCard";
import { IProductList } from "../../../_types_/db";
import {
  // MY_PRODUCT_LIST_QUERY,
  ALL_PRODUCT_LIST_QUERY,
} from "../../../_types_/gql";
import { useSelector } from "react-redux";
import { AuthState } from "../../../store/auth";
import { Link, useParams } from "react-router-dom";
import "./index.scss";

export const AllProductList = () => {
  const auth = useSelector((x: { auth: AuthState }) => x.auth);
  const filterList = [
    { label: "My Products", value: "self" },
    { label: "All", value: "others" },
    { label: "Bought", value: "bought" },
    { label: "Sold", value: "sold" },
    { label: "Borrowed", value: "borrowed" },
    { label: "Lent", value: "lent" },
  ];
  const { filter } = useParams();

  const { data: productList } = useQuery<IProductList>(ALL_PRODUCT_LIST_QUERY, {
    fetchPolicy: "no-cache",
    variables: {
      userId: Number(auth.user.id),
      filter: filter,
    },
  });
  // console.log(auth);
  return (
    <Layout>
      <div className="productlist_nav">
        {filterList.map((element) => {
          return (
            <Link
              className={
                element.value === filter
                  ? "productlist_nav_link--active"
                  : "productlist_nav_link"
              }
              to={`/products/${element.value}`}
            >
              {element.label}
            </Link>
          );
        })}
      </div>
      <div className="productlist_list">
        {productList?.allProducts && productList?.allProducts?.length > 0 ? (
          productList?.allProducts
            ?.slice(0)
            ?.reverse()
            ?.map(
              ({
                id,
                title,
                description,
                price,
                posted,
                views,
                category_product,
                user,
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
                      ?.map(
                        (category_product) => category_product.category.name
                      )
                      .join(", ")}
                    user={user}
                  />
                );
              }
            )
        ) : (
          <div>No products in this category</div>
        )}
      </div>
    </Layout>
  );
};
