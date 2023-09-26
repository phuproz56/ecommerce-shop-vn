import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Shops from "./pages/Shops";
import Cart from "./pages/Cart";
import Details from "./pages/Details";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/shops" element={<Shops />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/product/details/:slug" element={<Details />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
