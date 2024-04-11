import React, { useEffect, useState } from "react";
import Layout from "../../layouts/Layout";
import { Input, InputWrapper, MultiSelect, Textarea } from "@mantine/core";
import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

const EditProduct = () => {
  const { id } = useParams();
  const [productData, setProductData] = useState<{
    title: string;
    description: string;
    price: string;
    rent: string;
    // posted: string;
    // views: string;
    // status: string;
  }>({
    title: "",
    description: "",
    price: "",
    rent: "",
    // posted: "",
    // views: "",
    // status: "",
  });
  const SINGLE_PRODUCT_QUERY = gql`
    query Query($id: String!) {
      product(id: $id) {
        id
        title
        description
        price
        rent
        posted
        views
        status
        category_product {
          id
          category {
            name
          }
        }
      }
    }
  `;
  const CATEGORY_LIST_QUERY = gql`
    query Query {
      category {
        id
        name
      }
    }
  `;
  const { data: productDetails } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: { id: id },
  });
  const { data: categoryList } = useQuery(CATEGORY_LIST_QUERY);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    if (productDetails) {
      setProductData({
        title: productDetails?.product.title as string,
        description: productDetails?.product.description as string,
        price: productDetails?.product.price as string,
        rent: productDetails?.product.rent as string,
        // posted: "",
        // views: "",
        // status: ""
      });
      setSelectedCategories(
        productDetails?.product.category_product.map((element) => element["id"])
      );
    }
  }, [productDetails]);
  // console.log(selectedCategories);
  return (
    <Layout>
      <InputWrapper label="Title">
        <Input
          value={productData.title}
          onChange={(e) =>
            setProductData((prevState) => ({
              ...prevState,
              title: e.target.value,
            }))
          }
        />
      </InputWrapper>
      <InputWrapper label="Category">
        <MultiSelect
          value={selectedCategories}
          onChange={(e) => {
            // console.log(e);
            setSelectedCategories(e);
          }}
          data={categoryList?.category.map((element) => ({
            label: element.name,
            value: element.id,
          }))}
        />
      </InputWrapper>
      <InputWrapper label="Description">
        <Textarea
          value={productData.description}
          onChange={(e) =>
            setProductData((prevState) => ({
              ...prevState,
              description: e.target.value,
            }))
          }
        />
      </InputWrapper>
    </Layout>
  );
};

export default EditProduct;
