import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import { AllProductList } from "./components/pages/ProductList";
import EditProduct from "./components/pages/EditProduct";
import CreateProduct from "./components/pages/CreateProduct";
import { RegularPrivateRoute } from "./components/elements/PrivateRoute";
import routes from "./constants/routes";
import ProductDetail from "./components/pages/ProductDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={routes.LOGIN_PAGE} />} />
        <Route path={routes.LOGIN_PAGE} element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* <Route
          path={routes.MY_PRODUCT_LIST_PAGE}
          element={<RegularPrivateRoute children={<MyProductList />} />}
        /> */}
        <Route
          path={routes.ALL_PRODUCT_LIST_PAGE}
          element={<RegularPrivateRoute children={<AllProductList />} />}
        />
        <Route
          path={`${routes.PRODUCT_DETAIL_PAGE}/:id`}
          element={<RegularPrivateRoute children={<ProductDetail />} />}
        />
        <Route
          path={routes.PRODUCT_CREATE_PAGE}
          element={<RegularPrivateRoute children={<CreateProduct />} />}
        />
        <Route
          path={`${routes.PRODUCT_EDIT_PAGE}/:id`}
          element={<RegularPrivateRoute children={<EditProduct />} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
