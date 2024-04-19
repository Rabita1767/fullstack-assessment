import { useQuery } from "@apollo/client";
import React from "react";
import { SINGLE_PRODUCT_QUERY } from "../../../_types_/gql";
import { useParams } from "react-router-dom";
import "./index.scss";

const ProductDetail = () => {
  const { id } = useParams();
  const { data: productDetails } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: { id: id },
  });
  return (
    <div className="main">
      <span className="main_header">Summary</span>
      <span className="main_title">
        Title: {productDetails?.oneProduct.title}
      </span>
      <span className="main_categories">
        Categories:{" "}
        {productDetails?.oneProduct?.category_product
          ?.map(
            (element: { category: { name: string } }) => element.category.name
          )
          .join(", ")}
      </span>
      <span>Price: ${productDetails?.oneProduct.price}</span>
      <span className="main_description">
        Description: {productDetails?.oneProduct.description}
      </span>
    </div>
  );
};

export default ProductDetail;
