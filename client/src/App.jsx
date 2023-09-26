import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Shops from "./pages/Shops";
import Cart from "./pages/Cart";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/shops" element={<Shops />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
