import { Button, Input, MultiSelect, Select, Textarea } from "@mantine/core";
import { useEffect, useState } from "react";
import "./index.scss";
import Layout from "../../layouts/Layout";
import { useMutation, useQuery } from "@apollo/client";
import { IProductInput } from "../../../_types_/client";
import {
  CATEGORY_LIST_QUERY,
  CREATE_PRODUCT_MUTATION,
} from "../../../_types_/gql";
import { useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import routes from "../../../constants/routes";
import { useSelector } from "react-redux";
import { AuthState } from "../../../store/auth";

const CreateProduct = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(0);
  const [formData, setFormData] = useState<IProductInput>({
    title: "",
    category: [],
    description: "",
    price: 0,
    rent_amount: 0,
    rent_rate: "hours",
    userId: -1,
  });

  const { data: categoryList } = useQuery(CATEGORY_LIST_QUERY);
  const [triggerCreateProduct, { data: createdProduct, error }] = useMutation(
    CREATE_PRODUCT_MUTATION
  );
  const auth = useSelector((x: { auth: AuthState }) => x.auth);

  useEffect(() => {
    if (createdProduct?.productAdd) {
      notifications.show({
        title: "Success",
        message: "Successfully added product",
        color: "green",
      });
      navigate(`/products/self`);
    } else if (error) {
      notifications.show({
        title: "Error",
        message: "Failed to add product!",
        color: "red",
      });
    }
  }, [createdProduct, navigate, error]);
  console.log(categoryList);
  return (
    <Layout>
      <div className="createproduct">
        <div className="createproduct_form">
          {step === 0 ? (
            <>
              <span>Add a title for your product</span>
              <Input
                value={formData.title}
                onChange={(e) =>
                  setFormData((prevState) => ({
                    ...prevState,
                    title: e.target.value,
                  }))
                }
              />
            </>
          ) : null}
          {step === 1 ? (
            <>
              <span>Select category for the product</span>
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
            </>
          ) : null}
          {step === 2 ? (
            <>
              <span>Add description for the product</span>
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
            </>
          ) : null}
          {step === 3 ? (
            <div className="createproduct_form_3">
              <div className="createproduct_form_3_price">
                <span>Select Price</span>
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
              </div>
              <div className="createproduct_form_3_rent">
                <span className="createproduct_form_3_rent_label">
                  Select Rent
                </span>
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
                  onChange={(e) =>
                    setFormData((prevState) => ({
                      ...prevState,
                      rent_rate: e ?? "",
                    }))
                  }
                  data={[
                    { label: "hour", value: "hour" },
                    { label: "day", value: "day" },
                    { label: "week", value: "week" },
                    { label: "month", value: "month" },
                  ]}
                />
              </div>
            </div>
          ) : null}
          {step === 4 ? (
            <div className="createproduct_form_4">
              <span>Summary</span>
              <span>Title: {formData.title}</span>
              <span>Categories: {formData.category.join(", ")}</span>
              <span>Description: {formData.description}</span>
              <span>
                <span>Price: ${formData.price}</span>
                <span>
                  Rent: ${formData.rent_amount} per {formData.rent_rate}
                </span>
              </span>
            </div>
          ) : null}
        </div>
        <div className="createproduct_back">
          {step === 0 ? null : (
            <Button
              onClick={() => {
                if (step > 0) setStep((prevState) => prevState - 1);
              }}
            >
              Back
            </Button>
          )}
        </div>
        <div className="createproduct_next">
          <Button
            onClick={() => {
              if (step < 4) {
                setStep((prevState) => prevState + 1);
              } else if (step === 4) {
                formData.posted = new Date();
                formData.userId = Number(auth.user.id);
                triggerCreateProduct({ variables: formData });
              }
            }}
          >
            {step === 4 ? "Submit" : "Next"}
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
