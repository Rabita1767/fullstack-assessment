import { Button } from "@mantine/core";
import "./index.scss";
import { Link, useNavigate } from "react-router-dom";
import routes from "../../../constants/routes";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="header">
      {/* <Link to={routes.MY_PRODUCT_LIST_PAGE}>
        <Button>MY PRODUCTS</Button>
      </Link> */}
      <Link to={routes.ALL_PRODUCT_LIST_PAGE}>
        <Button>ALL PRODUCTS</Button>
      </Link>
      <Link to={routes.PRODUCT_CREATE_PAGE}>
        <Button>CREATE PRODUCT</Button>
      </Link>
      <Button
        onClick={() => {
          localStorage.removeItem("user");
          navigate(routes.LOGIN_PAGE);
        }}
      >
        LOG OUT
      </Button>
    </div>
  );
};

export default Header;
