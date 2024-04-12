import React, { FormEvent, useEffect, useState } from "react";
import Layout from "../../layouts/Layout";
import {
  Button,
  Input,
  InputWrapper,
  MultiSelect,
  Textarea,
} from "@mantine/core";
import { useParams } from "react-router-dom";
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import "./index.scss";
import { notifications } from "@mantine/notifications";

const EditProduct = () => {
  const { id } = useParams();
  const [productData, setProductData] = useState<{
    title: string;
    description: string;
    price: string;
    rent: string;
    category: string[];
  }>({
    title: "",
    description: "",
    price: "",
    rent: "",
    category: [],
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
            id
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

  const UPDATE_PRODUCT_QUERY = gql`
    mutation Mutation(
      $id: ID
      $title: String
      $description: String
      $price: Int
      $category: [String]
      $rent: Int
    ) {
      productUpdate(
        id: $id
        title: $title
        description: $description
        price: $price
        category: $category
        rent: $rent
      ) {
        id
        title
        price
        price
        rent
        posted
        views
        category_product {
          id
          category {
            name
          }
        }
      }
    }
  `;

  const { data: productDetails } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: { id: id },
  });
  const { data: categoryList } = useQuery(CATEGORY_LIST_QUERY);
  const [triggerUpdateProduct, { data: updatedProduct }] =
    useMutation(UPDATE_PRODUCT_QUERY);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    if (productDetails) {
      setProductData({
        title: productDetails?.product.title as string,
        description: productDetails?.product.description as string,
        price: productDetails?.product.price as string,
        rent: productDetails?.product.rent as string,
        category: productDetails?.product.category_product.map(
          (element) => element.category.id
        ),
      });
      // setSelectedCategories(
      //   productDetails?.product.category_product.map((element) => element["id"])
      // );
    }
  }, [productDetails]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const requestBody: { [key: string]: string | number | string[] } = {};

    if (productData.title !== productDetails.product.title) {
      requestBody["title"] = productData.title;
    }

    if (productData.description !== productDetails.product.description) {
      requestBody["description"] = productData.description;
    }

    if (productData.price !== productDetails.product.price) {
      requestBody["price"] = Number(productData.price);
    }

    if (productData.rent !== productDetails.product.rent) {
      requestBody.rent = Number(productData.rent);
    }

    if (Object.keys(requestBody).length === 0) {
      notifications.show({
        title: "Error",
        message: "Nothing to update!",
        color: "red",
      });
    }

    requestBody["category"] = productData.category;
    if (id) {
      requestBody["id"] = id;
    }

    triggerUpdateProduct({ variables: requestBody });
  };

  console.log(categoryList);

  return (
    <Layout>
      <form className="editproduct" onSubmit={onSubmit}>
        <InputWrapper label="Title" className="editproduct_title">
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
        <InputWrapper label="Category" className="editproduct_category">
          <MultiSelect
            value={productData.category}
            onChange={(e) => {
              // console.log(e);
              setProductData((prevState) => ({ ...prevState, category: e }));
            }}
            data={categoryList?.category.map((element) => ({
              label: element.name,
              value: element.id,
            }))}
          />
        </InputWrapper>
        <InputWrapper label="Description" className="editproduct_description">
          <Textarea
            // minRows={50}
            autosize
            resize="vertical"
            value={productData.description}
            onChange={(e) =>
              setProductData((prevState) => ({
                ...prevState,
                description: e.target.value,
              }))
            }
          />
        </InputWrapper>
        <InputWrapper label="Price" className="editproduct_price">
          <Input
            value={productData.price}
            onChange={(e) =>
              setProductData((prevState) => ({
                ...prevState,
                price: e.target.value,
              }))
            }
          />
        </InputWrapper>
        <InputWrapper label="Rent" className="editproduct_rent">
          <Input
            value={productData.rent}
            onChange={(e) =>
              setProductData((prevState) => ({
                ...prevState,
                rent: e.target.value,
              }))
            }
          />
        </InputWrapper>
        <div className="editproduct_submit">
          <Button type="submit">Edit Product</Button>
        </div>
      </form>
    </Layout>
  );
};

export default EditProduct;
