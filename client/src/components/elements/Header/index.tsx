import { Button } from "@mantine/core";
import "./index.scss";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="header">
      <div>
        <Link to={"/private/products/create"}>
          <Button>CREATE PRODUCT</Button>
        </Link>
      </div>
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
