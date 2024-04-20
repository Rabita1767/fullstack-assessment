import { useEffect, useState } from "react";
import "./index.scss";
// import { Link } from "react-router-dom";
import { Button, Modal } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit, faEye } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AuthState } from "../../../store/auth";
import routes from "../../../constants/routes";
import { useMutation } from "@apollo/client";
import { notifications } from "@mantine/notifications";
import { DELETE_PRODUCT_MUTATION } from "../../../_types_/gql";

interface IProductCard {
  id: number;
  title: string;
  category: string;
  price: number;
  description: string;
  posted: number;
  views: number;
  user: {
    id: string;
  };
}

const ProductCard: React.FC<IProductCard> = ({
  id,
  title,
  category,
  price,
  description,
  posted,
  views,
  user,
}) => {
  const [seeMore, setSeeMore] = useState<boolean>(
    description.length > 220 ? true : false
  );
  const navigate = useNavigate();
  const auth = useSelector((x: { auth: AuthState }) => x.auth);
  const [
    triggerDeleteProduct,
    { data: deleteProduct, error: deleteProductError },
  ] = useMutation(DELETE_PRODUCT_MUTATION);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  useEffect(() => {
    if (deleteProduct) {
      notifications.show({
        title: "Success",
        message: "Successfully deleted product",
        color: "green",
      });
      setDeleteModal(false);
      navigate("/products/self");
    }
    if (deleteProductError) {
      notifications.show({
        title: "Error",
        message: deleteProductError.message,
        color: "red",
      });
    }
  }, [deleteProduct, deleteProductError, navigate]);

  return (
    <div
      className="productcard"
      // to={`/private/products/detail/${id}`}
    >
      <Modal
        opened={deleteModal}
        onClose={() => setDeleteModal(false)}
        className="productcard_modal"
      >
        <span>Are you sure you want to delete this product?</span>
        <div className="productcard_modal_buttons">
          <Button color="red" onClick={() => setDeleteModal(false)}>
            No
          </Button>
          <Button
            onClick={() => {
              triggerDeleteProduct({
                variables: {
                  productId: Number(id),
                },
              });
            }}
          >
            Yes
          </Button>
        </div>
      </Modal>
      <span className="productcard_title">{title}</span>
      <div className="productcard_buttons">
        <button
          className="productcard_editbtn"
          onClick={(e) => {
            e.preventDefault();
            navigate(`${routes.PRODUCT_DETAIL_PAGE}/${id}`);
          }}
        >
          <FontAwesomeIcon icon={faEye} />
        </button>
        {auth.user.id === user?.id ? (
          <>
            <button
              className="productcard_editbtn"
              onClick={(e) => {
                e.preventDefault();
                navigate(`${routes.PRODUCT_EDIT_PAGE}/${id}`);
              }}
            >
              <FontAwesomeIcon icon={faEdit} />
            </button>
            <button
              className="productcard_deletebtn"
              onClick={() => {
                setDeleteModal(true);
              }}
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
          </>
        ) : null}
        {/* {auth.user.id !== user?.id ? <button>View Product</button> : null} */}
      </div>
      <span className="productcard_category">Category: {category}</span>
      <span className="productcard_price">Price: {price}</span>
      <span className="productcard_description">
        {seeMore ? (
          <span>{`${description.substring(0, 220)}...`}</span>
        ) : (
          description
        )}
        {description.length > 220 ? (
          <button className="seemore" onClick={() => setSeeMore(!seeMore)}>
            {seeMore ? "More" : "Less"} Details
          </button>
        ) : null}
      </span>
      <span className="productcard_posted">
        Date posted:{" "}
        {`${new Date(Number(posted)).getDate()}-${new Date(
          Number(posted)
        ).getMonth()}-${new Date(Number(posted)).getFullYear()}`}
      </span>
      <span className="productcard_views">{views} views</span>
    </div>
  );
};

export default ProductCard;
