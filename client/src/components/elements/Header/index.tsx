import { Button } from "@mantine/core";
import "./index.scss";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <div>
        <Link to={"/products/create"}>
          <Button>CREATE PRODUCT</Button>
        </Link>
      </div>
      <Button>LOG OUT</Button>
    </div>
  );
};

export default Header;
