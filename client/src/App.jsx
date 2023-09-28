import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Shops from "./pages/Shops";
import Cart from "./pages/Cart";
import Details from "./pages/Details";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Shipping from "./pages/Shipping";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { get_categorys } from "./store/reducers/homeReducer";
import CategoryShops from "./pages/CategoryShops";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_categorys());
  }, [dispatch]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="/shops" element={<Shops />}></Route>
        <Route path="/product?" element={<CategoryShops />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/shipping" element={<Shipping />}></Route>
        <Route path="/product/details/:slug" element={<Details />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
