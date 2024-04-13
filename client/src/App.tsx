import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import ProductList from "./components/pages/ProductList";
import EditProduct from "./components/pages/EditProduct";
import CreateProduct from "./components/pages/CreateProduct";
import { useContext } from "react";
import { UserContext } from "./store/user";

function App() {
  const userContext: { email: string } = useContext(UserContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/private/products"
          element={
            userContext?.email ? <ProductList /> : <Navigate to={"/login"} />
          }
        />
        <Route
          path="/private/products/create"
          element={
            userContext?.email ? <CreateProduct /> : <Navigate to={"/login"} />
          }
        />
        <Route
          path="/private/products/detail/:id"
          element={
            userContext?.email ? <EditProduct /> : <Navigate to={"/login"} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
