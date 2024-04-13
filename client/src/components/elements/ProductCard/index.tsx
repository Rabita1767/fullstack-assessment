import { useState } from "react";
import "./index.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

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

  return (
    <Link className="productcard" to={`/private/products/detail/${id}`}>
      <span className="productcard_title">{title}</span>
      <button
        className="productcard_deletebtn"
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        <FontAwesomeIcon icon={faTrashAlt} />
      </button>
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
    </Link>
  );
};

export default ProductCard;
