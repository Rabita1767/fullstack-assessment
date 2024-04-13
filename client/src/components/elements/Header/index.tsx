import { Button } from "@mantine/core";
import "./index.scss";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="header">
      <Link to={"/private/products"}>
        <Button>ALL PRODUCTS</Button>
      </Link>
      <Link to={"/private/products/create"}>
        <Button>CREATE PRODUCT</Button>
      </Link>
      <Button
        onClick={() => {
          localStorage.removeItem("user");
          navigate("/login");
        }}
      >
        LOG OUT
      </Button>
    </div>
  );
};

export default Header;
