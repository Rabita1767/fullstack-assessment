import { useMutation, useQuery } from "@apollo/client";
import { RENT_PRODUCT, SINGLE_PRODUCT_QUERY } from "../../../_types_/gql";
import { useParams } from "react-router-dom";
import "./index.scss";
import Layout from "../../layouts/Layout";
import { Button, Input, Modal } from "@mantine/core";
import { useSelector } from "react-redux";
import { AuthState } from "../../../store/auth";
import { useEffect, useState } from "react";
import { notifications } from "@mantine/notifications";

const ProductDetail = () => {
  const { id } = useParams();
  const { data: productDetails } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: { id: id },
  });
  const [triggerRentProduct, { data: rentProduct, error: rentProductError }] =
    useMutation(RENT_PRODUCT);
  const [rentModal, setRentModal] = useState<boolean>(false);
  const [purchaseModal, setPurchaseModal] = useState<boolean>(false);
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");

  const auth = useSelector((x: { auth: AuthState }) => x.auth);

  useEffect(() => {
    if (rentProduct) {
      notifications.show({
        title: "Success",
        message: "Successfully rented product",
        color: "green",
      });
      setRentModal(false);
    }
    if (rentProductError) {
      notifications.show({
        title: "Error",
        message: rentProductError.message,
        color: "red",
      });
    }
  }, [rentProduct, rentProductError]);

  return (
    <Layout>
      <Modal
        // style={{ display: "flex", gap: "0.75rem", flexDirection: "column" }}
        opened={rentModal}
        onClose={() => setRentModal(false)}
      >
        Rental Period
        <div>
          From:
          <Input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
          To:
          <Input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "0.75rem",
          }}
        >
          <Button color="red" onClick={() => setRentModal(false)}>
            Go Back
          </Button>
          <Button
            onClick={() => {
              triggerRentProduct({
                variables: {
                  productId: Number(id),
                  userId: Number(auth.user.id),
                  from: new Date(fromDate).toISOString(),
                  to: new Date(toDate).toISOString(),
                },
              });
            }}
          >
            Confirm
          </Button>
        </div>
      </Modal>
      <Modal opened={purchaseModal} onClose={() => setPurchaseModal(false)}>
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
        >
          Are you sure you want to buy this product?
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "1.75rem",
            }}
          >
            <Button color="red" onClick={() => setPurchaseModal(false)}>
              No
            </Button>
            <Button
              onClick={() => {
                //
              }}
            >
              Yes
            </Button>
          </div>
        </div>
      </Modal>
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
        {auth.user.id !== productDetails?.oneProduct?.user?.id ? (
          <div className="main_actions">
            <Button onClick={() => setRentModal(true)}>Rent</Button>
            <Button onClick={() => setPurchaseModal(true)}>Buy</Button>
          </div>
        ) : null}
      </div>
    </Layout>
  );
};

export default ProductDetail;
