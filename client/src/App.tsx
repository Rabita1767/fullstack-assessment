import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import ProductList from "./components/pages/ProductList";
import EditProduct from "./components/pages/EditProduct";
import CreateProduct from "./components/pages/CreateProduct";
import { AdminPrivateRoute } from "./components/elements/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/private/products"
          element={<AdminPrivateRoute children={<ProductList />} />}
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
