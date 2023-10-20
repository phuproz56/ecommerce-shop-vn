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
import SearchProducts from "./pages/SearchProducts";
import Payment from "./pages/Payment";
import Dashboard from "./pages/Dashboard";
import ProtectUser from "./utils/ProtectUser";
import Index from "./components/dashboard/Index.jsx";
import Orders from "./components/dashboard/Orders";
import Wishlist from "./components/dashboard/Wishlist";
import ChangePassword from "./components/dashboard/ChangePassword";
import Order from "./components/dashboard/Order";
import Chat from "./components/dashboard/Chat";
import ConfirmOrder from "./pages/ConfirmOrder";
import Address from "./components/dashboard/Address";
import Profile from "./components/dashboard/Profile";
import Event from "./pages/Event";
import Tatca from "./components/dashboard/orders/Tatca";
import Chothanhtoan from "./components/dashboard/orders/Chothanhtoan";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_categorys());
  }, [dispatch]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/shops" element={<Shops />} />
        <Route path="/product?" element={<CategoryShops />} />
        <Route path="/product/search?" element={<SearchProducts />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/event" element={<Event />} />
        <Route path="/order/confirm?" element={<ConfirmOrder />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/product/details/:slug" element={<Details />} />

        <Route path="/dashboard" element={<ProtectUser />}>
          <Route path="" element={<Dashboard />}>
            <Route path="" element={<Index />} />
            <Route path="address" element={<Address />} />
            <Route path="my-orders" element={<Orders />}>

              <Route path="" element={<Orders />}/>
              <Route path="" element={<Tatca />} />
              <Route path="my-orders/tatca" element={<Tatca />} />
              <Route path="my-orders/chothanhtoan" element={<Chothanhtoan />} />
              <Route path="my-orders/vanchuyen" element={<Chothanhtoan />} />
              <Route path="my-orders/danggiao" element={<Chothanhtoan />} />
              <Route path="my-orders/hoanthanh" element={<Chothanhtoan />} />
              <Route path="my-orders/dahuy" element={<Chothanhtoan />} />
            </Route>

            <Route path="my-wishlist" element={<Wishlist />} />
            <Route path="order/details/:orderId" element={<Order />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="profile" element={<Profile />} />
            <Route path="chat" element={<Chat />} />
            <Route path="chat/:sellerId" element={<Chat />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
