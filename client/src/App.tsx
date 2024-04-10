import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import ProductList from "./components/pages/ProductList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/products" element={<ProductList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
