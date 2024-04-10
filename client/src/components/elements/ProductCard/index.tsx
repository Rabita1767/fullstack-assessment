import { useEffect, useState } from "react";
import "./index.scss";
import { Button } from "@mantine/core";
import { Link } from "react-router-dom";

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
    <Link className="productcard" to={`/products/detail/${id}`}>
      <span className="productcard_title">{title}</span>
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
