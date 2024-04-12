import { FormEvent, useEffect, useState } from "react";
import Layout from "../../layouts/Layout";
import {
  Button,
  Input,
  InputWrapper,
  MultiSelect,
  Select,
  Textarea,
} from "@mantine/core";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import "./index.scss";
import { notifications } from "@mantine/notifications";
import { IProductInput } from "../../../_types_/client";
import {
  CATEGORY_LIST_QUERY,
  SINGLE_PRODUCT_QUERY,
  UPDATE_PRODUCT_QUERY,
} from "../../../_types_/gql";

const EditProduct = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState<IProductInput>({
    title: "",
    description: "",
    price: 0,
    rent_amount: 0,
    rent_rate: "hours",
    category: [],
  });

  const { data: productDetails } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: { id: id },
  });
  const { data: categoryList } = useQuery(CATEGORY_LIST_QUERY);
  const [triggerUpdateProduct] = useMutation(UPDATE_PRODUCT_QUERY);

  useEffect(() => {
    if (productDetails) {
      setFormData({
        title: productDetails?.product.title,
        description: productDetails?.product.description,
        price: productDetails?.product.price,
        rent_amount: productDetails?.product.rent_amount ?? 0,
        rent_rate: productDetails?.product.rent_rate ?? "hours",
        category: productDetails?.product.category_product.map(
          (element: { category: { id: string } }) => element.category.id
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

    if (formData.title !== productDetails.product.title) {
      requestBody["title"] = formData.title;
    }

    if (formData.description !== productDetails.product.description) {
      requestBody["description"] = formData.description;
    }

    if (formData.price !== productDetails.product.price) {
      requestBody["price"] = Number(formData.price);
    }

    if (formData.rent_amount !== productDetails.product.rent_amount) {
      requestBody.rent_amount = Number(formData.rent_amount);
    }

    if (formData.rent_rate !== productDetails.product.rent_rate) {
      requestBody.rent_rate = Number(formData.rent_rate);
    }

    if (Object.keys(requestBody).length === 0) {
      notifications.show({
        title: "Error",
        message: "Nothing to update!",
        color: "red",
      });
    }

    requestBody["category"] = formData.category;
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
            value={formData.title}
            onChange={(e) =>
              setFormData((prevState) => ({
                ...prevState,
                title: e.target.value,
              }))
            }
          />
        </InputWrapper>
        <InputWrapper label="Category" className="editproduct_category">
          <MultiSelect
            value={formData.category}
            onChange={(e) => {
              // console.log(e);
              setFormData((prevState) => ({ ...prevState, category: e }));
            }}
            data={categoryList?.category.map(
              (element: { id: string; name: string }) => ({
                label: element.name,
                value: element.id,
              })
            )}
          />
        </InputWrapper>
        <InputWrapper label="Description" className="editproduct_description">
          <Textarea
            // minRows={50}
            autosize
            resize="vertical"
            value={formData.description}
            onChange={(e) =>
              setFormData((prevState) => ({
                ...prevState,
                description: e.target.value,
              }))
            }
          />
        </InputWrapper>
        <InputWrapper label="Price" className="editproduct_price">
          <Input
            type="number"
            value={formData.price}
            onChange={(e) =>
              setFormData((prevState) => ({
                ...prevState,
                price: Number(e.target.value),
              }))
            }
          />
        </InputWrapper>
        <InputWrapper label="Rent" className="editproduct_rent">
          <div className="editproduct_rent_container">
            <Input
              type="number"
              value={formData.rent_amount}
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  rent_amount: Number(e.target.value),
                }))
              }
            />
            <Select
              // defaultValue={"hours"}
              value={formData.rent_rate}
              data={[
                { label: "hour", value: "hour" },
                { label: "day", value: "day" },
                { label: "week", value: "week" },
                { label: "month", value: "month" },
              ]}
            />
          </div>
        </InputWrapper>
        <div className="editproduct_submit">
          <Button type="submit">Edit Product</Button>
        </div>
      </form>
    </Layout>
  );
};

export default EditProduct;
