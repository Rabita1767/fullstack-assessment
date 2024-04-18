import { useState } from "react";
import "./index.scss";
// import { Link } from "react-router-dom";
import { Button, Modal } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

interface IProductCard {
  id: number;
  title: string;
  category: string;
  price: number;
  description: string;
  posted: number;
  views: number;
}

const ProductCard: React.FC<IProductCard> = ({
  id,
  title,
  category,
  price,
  description,
  posted,
  views,
}) => {
  const [seeMore, setSeeMore] = useState<boolean>(
    description.length > 220 ? true : false
  );
  // const [opened, {open, close}] = useDisclosure
  const [modal, setModal] = useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <div
      className="productcard"
      // to={`/private/products/detail/${id}`}
    >
      <Modal
        opened={modal}
        onClose={() => setModal(false)}
        className="productcard_modal"
      >
        <span>Are you sure you want to delete this product?</span>
        <div className="productcard_modal_buttons">
          <Button color="red" onClick={() => setModal(false)}>
            No
          </Button>
          <Button>Yes</Button>
        </div>
      </Modal>
      <span className="productcard_title">{title}</span>
      <div className="productcard_buttons">
        <button
          className="productcard_editbtn"
          onClick={(e) => {
            e.preventDefault();
            navigate(`/private/products/detail/${id}`);
          }}
        >
          <FontAwesomeIcon icon={faEdit} />
        </button>
        <button
          className="productcard_deletebtn"
          onClick={() => {
            setModal(true);
          }}
        >
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
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
      <span className="productcard_posted">{posted}</span>
      <span className="productcard_views">{views} views</span>
    </div>
  );
};

export default ProductCard;
