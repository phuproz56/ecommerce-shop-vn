import React from "react";
import Headers from "../components/Headers";
import { Link } from "react-router-dom";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Footer from "../components/Footer";

const Cart = () => {
  const cart_products = [1, 2, 3];
  const outOfStockProduct = [1];
  return (
    <div>
      <Headers />
      <section className="bg-[url('http://localhost:3000/images/banner/cart.jpg')] h-[220px] mt-6 bg-cover bg-no-reqeat relative bg-left">
        <div className="absolute left-0 top-0 h-full w-full mx-auto bg-[#2422228a]">
          <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
            <div className="flex flex-col justify-center gap-1 items-center h-full w-full text-white">
              <h2 className="text-3xl font-bold">shop.my</h2>
              <div className="flex justify-center items-center gap-2 text-2xl w-full">
                <Link to="/">Home</Link>
                <span className="pt-2">
                  <MdOutlineKeyboardArrowRight />
                </span>
                <span>Cart</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#eeeeee]">
        <div className="w-[85%] lg:w-[90%] md:w-[90%] sm:w-[90%] mx-auto py-16 ">
          {cart_products.length > 0 || outOfStockProduct.length > 0 ? (
            <div className="flex flex-wrap">
              <div className="w-[67%] md-lg:w-full">
                <div className="pr-3 md-lg:pr-0">
                  <div className="flex flex-col gap-3">
                    <div className="bg-white p-4">
                      <h2 className="text-md text-green-500">
                        Stock Products{" "}
                        {cart_products.length - outOfStockProduct}
                      </h2>
                    </div>
                    {cart_products.map((p, i) => (
                      <div className="flex bg-white p-4 flex-col gap-2">
                        <div className="flex justify-start items-center ">
                          <h2 className="text-md text-slate-600">
                            dasdasdsad 12
                          </h2>
                        </div>
                        {[1, 2].map((p, i) => (
                          <div className="w-full flex flex-wrap">
                            <div className="flex sm-w-full gap-2 w-7/12">
                              <div className="flex gap-2 justify-start items-center">
                                <img
                                  className="w-[80px] h-[80px]"
                                  src={`http://localhost:3000/images/products/${
                                    i + 1
                                  }.webp`}
                                  alt="product_image"
                                />
                                <div className="pr-4 text-slate-600">
                                  <h2 className="text-md">Ao thun askdjk</h2>
                                  <span className="text-sm">Brand : easy</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex justify-between w-5/12 sm:w-full sm:mt-3 ">
                              <div className="pl-4 sm:pt-0">
                                <h2 className="text-orange-500 text-lg">
                                  $135
                                </h2>
                                <p className="line-through">$150</p>
                                <p>-10%</p>
                              </div>
                              <div className="flex gap-2 flex-col">
                                <div className="flex bg-slate-200 h-[30px] justify-center items-center text-xl">
                                  <div className="px-3 cursor-pointer">-</div>
                                  <div className="px-3">5</div>
                                  <div className="px-3 cursor-pointer">+</div>
                                </div>
                                <button className="px-5 py-[3px] bg-red-500 text-white">
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <Link to="/shops" className="px-4 py-1 bg-indigo-500 text-white">
                Show Now
              </Link>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Cart;
