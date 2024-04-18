import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import ProductList from "./components/pages/ProductList";
import EditProduct from "./components/pages/EditProduct";
import CreateProduct from "./components/pages/CreateProduct";
import {
  AdminPrivateRoute,
  RegularPrivateRoute,
} from "./components/elements/PrivateRoute";
import routes from "./constants/routes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={routes.LOGIN_PAGE} />} />
        <Route path={routes.LOGIN_PAGE} element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path={routes.PRODUCT_LIST_PAGE}
          element={<RegularPrivateRoute children={<ProductList />} />}
        />
        <Route
          path="/private/products/create"
          element={<AdminPrivateRoute children={<CreateProduct />} />}
        />
        <Route
          path="/private/products/detail/:id"
          element={<AdminPrivateRoute children={<EditProduct />} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
