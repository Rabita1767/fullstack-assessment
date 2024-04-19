import { useQuery } from "@apollo/client";
import { SINGLE_PRODUCT_QUERY } from "../../../_types_/gql";
import { useParams } from "react-router-dom";
import "./index.scss";
import Layout from "../../layouts/Layout";
import { Button, Modal } from "@mantine/core";
import { useSelector } from "react-redux";
import { AuthState } from "../../../store/auth";
import { useState } from "react";

const ProductDetail = () => {
  const { id } = useParams();
  const { data: productDetails } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: { id: id },
  });
  const [rentModal, setRentModal] = useState<boolean>(false);
  const [purchaseModal, setPurchaseModal] = useState<boolean>(false);

  const auth = useSelector((x: { auth: AuthState }) => x.auth);
  console.log(auth.user.id, productDetails?.oneProduct);
  return (
    <Layout>
      <Modal opened={rentModal} onClose={() => setRentModal(false)}>
        Rental Period
      </Modal>
      <Modal opened={purchaseModal} onClose={() => setPurchaseModal(false)}>
        Are you sure you want to buy this product?
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
