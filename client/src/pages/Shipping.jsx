/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Headers from "../components/Headers";
import Footer from "../components/Footer";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  orderReducer,
  place_order,
  update_product,
} from "../store/reducers/orderReducer";
import { Country, State } from "country-state-city";
const Shipping = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 400,
      left: 400,
      behavior: "smooth",
    });
  }, [location]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const {
    state: { products, price, shipping_fee, items },
  } = useLocation();
  const [res, setRes] = useState(false);

  const [country, setCountry] = useState("VN");
  const [city, setCity] = useState("");
  const [address1, setAddress1] = useState("");
  const [user, setUser] = useState(false);

  const save = (e) => {
    e.preventDefault();
    const data = {
      userId: userInfo.id,
      name: userInfo.name,
      email: userInfo.email,
      address1: address1,
      city: city,
      country: country,
      phoneNumber: userInfo.phoneNumber,
    };
    if (data) {
      setRes(true);
    }
  };
  const placeOrder = () => {
    const data = {
      userId: userInfo.id,
      name: userInfo.name,
      email: userInfo.email,
      address1: address1,
      city: city,
      country: country,
      phoneNumber: userInfo.phoneNumber,
    };
    dispatch(
      place_order({
        price,
        products,
        shipping_fee,
        shippingInfo: data,
        userId: userInfo.id,
        navigate,
        items,
      })
    );
  };

  return (
    <div>
      <Headers />
      <section className="bg-[url('http://localhost:3000/images/banner/order.jpg')] h-[220px] mt-6 bg-cover bg-no-reqeat relative bg-left">
        <div className="absolute left-0 top-0 h-full w-full mx-auto bg-[#2422228a]">
          <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
            <div className="flex flex-col justify-center gap-1 items-center h-full w-full text-white">
              <h2 className="text-3xl font-bold">shop.my</h2>
              <div className="flex justify-center items-center gap-2 text-2xl w-full">
                <Link to="/cart">Cart</Link>
                <span className="pt-2">
                  <MdOutlineKeyboardArrowRight />
                </span>
                <span>Place Order</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#eeeeee]">
        <div className="w-[85%] lg:w-[90%] md:w-[90%] sm:w-[90%] mx-auto py-16 ">
          <div className="w-full flex flex-wrap ">
            <div className="w-[67%] md-lg:w-full">
              <div className="flex flex-col gap-3">
                <div className="bg-white p-6 shadow-sm rounded-md">
                  <h2 className="text-slate-600 font-bold pb-3">
                    Thông tin vận chuyển
                  </h2>
                  {!res && (
                    <div className="w-full 800px:w-[95%] bg-white rounded-md p-5 pb-8">
                      <h5 className="text-[18px] font-[500]">
                        Thông tin giao hàng
                      </h5>
                      <br />
                      <form onSubmit={save}>
                        <div className="w-full flex pb-3">
                          <div className="w-[50%]">
                            <label className="block pb-2">
                              Tên khách hàng:
                            </label>
                            <input
                              type="text"
                              value={userInfo && userInfo.name}
                              required
                              className={`border p-1 rounded-[5px] !w-[95%]`}
                            />
                          </div>
                          <div className="w-[50%]">
                            <label className="block pb-2">Email:</label>
                            <input
                              type="email"
                              value={userInfo && userInfo.email}
                              required
                              className={`w-full border p-1 rounded-[5px]`}
                            />
                          </div>
                        </div>

                        <div className="w-full flex pb-3">
                          <div className="w-[50%]">
                            <label className="block pb-2">
                              Số điện thoại: +(84)
                            </label>
                            <input
                              type="number"
                              required
                              value={userInfo && userInfo.phoneNumber}
                              className={`border p-1 rounded-[5px] !w-[95%]`}
                            />
                          </div>

                          <div className="w-[50%]">
                            <label className="block pb-2">
                              Tỉnh, thành phố:
                            </label>
                            <select
                              className="w-[95%] border h-[40px] rounded-[5px]"
                              value={city}
                              onChange={(e) => setCity(e.target.value)}
                            >
                              <option className="block pb-2" value="">
                                Chọn tỉnh, thành phố
                              </option>
                              {State &&
                                State.getStatesOfCountry(country).map(
                                  (item) => (
                                    <option key={item.name} value={item.name}>
                                      {item.name}
                                    </option>
                                  )
                                )}
                            </select>
                          </div>
                        </div>

                        <div className="w-full flex pb-3">
                          <div className="w-[50%]">
                            <label className="block pb-2">Khu vực:</label>
                            <select
                              className="w-[95%] border h-[40px] rounded-[5px]"
                              value={country}
                              onChange={(e) => setCountry(e.target.value)}
                            >
                              <option className="block pb-2" value="">
                                Chọn khu vực
                              </option>
                              {Country &&
                                Country.getAllCountries().map((item) => (
                                  <option
                                    key={item.isoCode}
                                    value={item.isoCode}
                                  >
                                    {item.name}
                                  </option>
                                ))}
                            </select>
                          </div>
                        </div>
                        <div className="w-full flex pb-3">
                          <div className="w-[50%]">
                            <label className="block pb-2">Địa chỉ:</label>
                            <input
                              type="address"
                              required
                              value={address1}
                              onChange={(e) => setAddress1(e.target.value)}
                              className={`border p-1 rounded-[5px] !w-[95%]`}
                            />
                          </div>
                        </div>

                        <div></div>
                        <div className="flex md:flex-col md:gap-2 w-full gap-5 text-slate-600 ">
                          <div className="flex flex-col gap-1 mt-3 w-full">
                            <button className="ml-[100px] mr-[100px] px-3 py-[6px] rounded-sm hover:shadow-indigo-500/20 hover: shadow-lg bg-indigo-500 text-white">
                              Lưu
                            </button>
                          </div>
                        </div>
                      </form>
                      <h5
                        className="text-[18px] cursor-pointer inline-block"
                        onClick={() => setUser(!user)}
                      >
                        Chọn địa chỉ mà bạn đã lưu:{" "}
                        <h5 className="text-[#027df0fd]">
                          (Nhấn vào đây để chọn)
                        </h5>
                      </h5>
                      {user && (
                        <div>
                          {userInfo &&
                            userInfo.addresses.map((item, index) => (
                              <div key={index} className="w-full flex mt-1">
                                <input
                                  type="checkbox"
                                  className="mr-3"
                                  value={item.addressType}
                                  onClick={() =>
                                    setAddress1(item.address1) ||
                                    setCountry(item.country) ||
                                    setCity(item.city)
                                  }
                                />
                                <h2>{item.addressType}</h2>
                              </div>
                            ))}
                        </div>
                      )}
                    </div>
                  )}

                  {res && (
                    <div className="flex flex-col gap-1">
                      <h2 className="text-slate-600 font-semibold pb-2">
                        Giao hàng đến {userInfo.name}
                      </h2>
                      <p>
                        <span className="bg-blue-200 text-blue-800 text-xs font-medium mr-2 px-3 py-1 rounded">
                          Home
                        </span>
                        <span className="text-slate-600 text-sm">
                          {address1} {city} {country}{" "}
                        </span>
                        <span
                          onClick={() => setRes(false)}
                          className="text-blue-500 cursor-pointer pl-[20px]"
                        >
                          thay đổi
                        </span>
                      </p>
                      <p>Email to {userInfo.email}</p>
                    </div>
                  )}
                </div>

                {products.map((p, i) => (
                  <div key={i} className="flex bg-white p-4 flex-col gap-2">
                    <div className="flex justify-start items-center ">
                      <h2 className="text-md text-slate-600">
                        Shop name: {p.shopName}
                      </h2>
                    </div>
                    {p.products.map((pt, j) => (
                      <div key={j} className="w-full flex flex-wrap">
                        <div className="flex sm-w-full gap-2 w-7/12">
                          <div className="flex gap-2 justify-start items-center">
                            <img
                              className="w-[80px] h-[80px]"
                              src={pt.productInfo.images[0]}
                              alt="product_image"
                            />
                            <div className="pr-4 text-slate-600">
                              <h2 className="text-md">{pt.productInfo.name}</h2>
                              <span className="text-sm">
                                Thương hiệu : {pt.productInfo.brand}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-end w-5/12 sm:w-full sm:mt-3 ">
                          <div className="pl-4 sm:pt-0">
                            <h2 className="text-orange-500 text-lg">
                              
                              {pt.productInfo.price -
                                Math.floor(
                                  pt.productInfo.price * pt.productInfo.discount
                                ) /
                                  100} đ
                            </h2>
                            <p className="line-through">
                              {pt.productInfo.price} đ
                            </p>
                            <p>-{pt.productInfo.discount}%</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div className="w-[33%] md-lg:w-full">
              <div className="pl-3 md-lg:pl-0">
                <div className="bg-white font-medium p-5 text-slate-600 flex flex-col gap-3">
                  <h2 className="text-xl font-semibold">HÓA ĐƠN</h2>
                  <div className="flex justify-between  items-center">
                    <span>Tổng Số Tiền</span>
                    <span className="text-lg text-orange-500">{price} đ</span>
                  </div>
                  <div className="flex justify-between  items-center">
                    <span>Phí Giao Hàng</span>
                    <span className="text-lg text-orange-500">
                      {shipping_fee} đ
                    </span>
                  </div>
                  <div className="flex justify-between  items-center">
                    <span>Tổng Số Tiền Cần Trả</span>
                    <span className="text-lg text-orange-500">
                      {price + shipping_fee} đ
                    </span>
                  </div>
                  <div className="flex justify-between  items-center">
                    <span>TỔNG</span>
                    <span className="text-lg text-orange-500">
                      {price + shipping_fee} đ
                    </span>
                  </div>
                  <button
                    onClick={placeOrder}
                    disabled={res ? false : true}
                    className={`px-5 py-[6px] rounded-sm hover:shadow-orange-500/20 hover:shadow-lg ${
                      res ? "bg-orange-500" : "bg-orange-200"
                    }  text-sm text-white uppercase`}
                  >
                    Đặt Hàng
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Shipping;
