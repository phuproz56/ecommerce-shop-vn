/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Headers from "../components/Headers";
import Footer from "../components/Footer";
import Stripe from "../components/Stripe";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import FadeLoader from "react-spinners/FadeLoader";
import success from "../assets/success.png";
import { useDispatch, useSelector } from "react-redux";
import { get_order } from "../store/reducers/orderReducer";

const Payment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    state: { price, orderId },
  } = useLocation();
  const { myOrder } = useSelector((state) => state.order);
  const location = useLocation();
  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const [loader, setLoader] = useState(true);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    dispatch(get_order(orderId));
  }, [dispatch, orderId]);

  const update_payment = async () => {
    const orderId = myOrder._id;

    if (orderId) {
      try {
        await axios.get(`http://localhost:5000/api/order/confirm/${orderId}`);
        setLoader(false);
        localStorage.removeItem("orderId");
      } catch (error) {
        console.log(error.response.data);
      }
    }
  };

  useEffect(() => {
    window.scrollTo({
      top: 50,
      left: 400,
      behavior: "smooth",
    });
  }, [location]);

  useEffect(() => {
    if (message === "succeeded") {
      update_payment();
      setTimeout(() => {
        navigate("/dashboard/tatca");
      }, 3000);
    }
  }, [message]);
  console.log(message);
  return (
    <div>
      <Headers />
      <section className="bg-[#eeeeee]">
        <div className="w-[85%] lg:w-[90%] md:w-[90%] sm:w-[90%] mx-auto py-16 mt-4">
          <div className="flex flex-wrap md:flex-col-reverse">
            <div className="w-7/12 md:w-full">
              <div className="pr-2 md:pr-0">
                <div className="flex flex-wrap">
                  <div
                    onClick={() => setPaymentMethod("stripe")}
                    className={`w-[30%] border-r cursor-pointer py-8 px-12 ${
                      paymentMethod === "stripe" ? "bg-white" : "bg-slate-100"
                    }`}
                  >
                    <div className="flex flex-col gap-[3px] justify-center items-center">
                      <img src="/images/payment/stripe.png" alt="stripe" />
                      <span className="text-slate-600">Stripe</span>
                    </div>
                  </div>
                  <div
                    onClick={() => setPaymentMethod("now")}
                    className={`w-[30%] border-r cursor-pointer py-8 px-12 ${
                      paymentMethod === "now" ? "bg-white" : "bg-slate-100"
                    }`}
                  >
                    <div className="flex flex-col gap-[3px] justify-center items-center">
                      <img src="/images/payment/paynow.jpg" alt="roket" />
                      <span className="text-slate-600">
                        Thanh toán sau khi nhận hàng
                      </span>
                    </div>
                  </div>
                </div>
                {paymentMethod === "stripe" && (
                  <div>
                    <Stripe orderId={orderId} price={price} />
                  </div>
                )}

                {paymentMethod === "now" && (
                  <div
                    onClick={() => setMessage("succeeded")}
                    className="w-full px-4 py-8 bg-white shadow-sm"
                  >
                    <button
                      className={`${
                        message === "succeeded" && "hidden"
                      } px-10 py-[6px] rounded-sm hover:shadow-wrange-500/20 hover:shadow-lg bg-orange-500 text-white`}
                    >
                      Mua Ngay
                    </button>
                    {message === "succeeded" ? (
                      loader ? (
                        <FadeLoader />
                      ) : (
                        <div className="flex flex-col gap-3 justify-center items-center">
                          <h1 className="">Mua thành công!</h1>
                          <img
                            className="flex flex-col w-[20px] justify-center items-center"
                            src={success}
                            alt="success logo"
                          />
                          <Link
                            className="px-5 py-2 bg-green-500 rounded-sm text-white flex flex-col justify-center items-center"
                            to="/dashboard/tatca"
                          >
                            Quay lại trang chủ
                          </Link>
                        </div>
                      )
                    ) : (
                      <FadeLoader />
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="w-5/12 md:w-full">
              <div className="pl-2 md:pl-0 md:mb-0">
                <div className="bg-white shadow p-5 text-slate-600 flex flex-col gap-3">
                  <h2>Hóa Đơn</h2>
                  <div className="flex justify-between items-center">
                    <span> sản phẩm và phí vận chuyển đã áp dụng</span>
                    <span>{price} đ</span>
                  </div>
                  <div className="flex justify-between items-center font-semibold">
                    <span>Tổng số tiền cần thanh toán</span>
                    <span className="text-lg text-orange-500">{price} đ</span>
                  </div>
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

export default Payment;
