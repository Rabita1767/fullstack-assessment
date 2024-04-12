import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import ProductList from "./components/pages/ProductList";
import EditProduct from "./components/pages/EditProduct";
import CreateProduct from "./components/pages/CreateProduct";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/products" element={<ProductList />} />
        <Route path="/products/create" element={<CreateProduct />} />
        <Route path="/products/detail/:id" element={<EditProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
