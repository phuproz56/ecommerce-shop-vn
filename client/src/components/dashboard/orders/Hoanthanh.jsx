/* eslint-disable react-hooks/exhaustive-deps */

import Orders from "../Orders";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {

  messageClear,
  get_all_orders,
} from "../../../store/reducers/orderReducer";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { RxCross1 } from "react-icons/rx";
import Reviews from "../../Reviews";
import { get_product } from "../../../store/reducers/homeReducer";

const Hoanthanh = () => {
  const dispatch = useDispatch();
  const { allOrders, successMessage, order_complete } = useSelector(
    (state) => state.order
  );
  const { userInfo } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const { product } = useSelector((state) => state.home);

  useEffect(() => {
    dispatch(get_all_orders());
    for (let i = 0; i < order_complete.length; i++) {
      const order_product = order_complete[i].products;
      for (let j = 0; j < order_product.length; j++) {
        dispatch(get_product(order_product[j].slug));
      }
    }
  }, [dispatch]);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      messageClear();
    }
  }, [successMessage]);


  return (
    <div>
      <Orders />
      <div className="bg-white p-4 rounded-md w-full mt-5 justify-center">
        {open && (
          <div className="fixed w-full h-screen bg-[#0000004b] top-0 left-0 flex items-center justify-center ">
            <div className="w-[50%] h-[80vh] pl-[100px] bg-white rounded shadow relative overflow-y-scroll">
              <div className="w-full flex justify-end p-3">
                <RxCross1
                  size={30}
                  className="cursor-pointer"
                  onClick={() => setOpen(false)}
                />
              </div>
              <h1 className="text-center text-[25px] font-Poppins">Đánh giá</h1>
              <div className="w-[50%]">
                <Reviews product={product} />
              </div>
            </div>
          </div>
        )}
        <div className="flex justify-between items-center w-full">
          <ul className="w-full">
            {allOrders.map((q, i) =>
              q.delivery_status === "Đã Giao Hàng" ? (
                <li key={i} className="mt-3 border border-slate-300 rounded-md">
                  <div className="flex flex-col w-full ">
                    <div className="p-5 flex flex-col">
                      <h2 className="text-slate-600 font-semibold">
                        Đã mua vào ngày: <span>{q.date}</span>{" "}
                        <div className="text-end">
                          <Link
                            to={`/dashboard/order/${q._id}`}
                            className="pl-[100px] text-green-500"
                          >
                            {q.delivery_status}
                          </Link>
                          {q.delivery_status === "Đã Giao Hàng" && (
                            <b className="border-l-2 text-red-400 uppercase ml-4">
                              hoàn thành
                            </b>
                          )}
                        </div>
                      </h2>

                      <div className="gap-3">
                        <div className="flex flex-col gap-1">
                          <h2 className="text-slate-600 font-semibold">
                            Chuyển Đến: {q.shippingInfo?.name}
                          </h2>
                          <p>
                            <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                              Địa chỉ:{" "}
                            </span>
                            <span>
                              {q.shippingInfo?.address}{" "}
                              {q.shippingInfo?.country} {q.shippingInfo?.city}{" "}
                              {q.shippingInfo?.address1}{" "}
                            </span>
                          </p>
                          <p className="text-slate-600 text-sm font-semibold">
                            Email: {userInfo.email}
                          </p>
                        </div>
                      </div>

                      <div className="mt-3 flex flex-col">
                        <h2 className="text-slate-600 text-lg pb-2">
                          Sản phẩm
                        </h2>
                        <div className="flex gap-5 ">
                          <ul>
                            {q.products?.map((p, i) => (
                              <li key={i}>
                                <div className="flex flex-col w-full">
                                  <div className="flex gap-5 justify-start items-center text-slate-600">
                                    <div className="flex gap-2">
                                      <img
                                        className="w-[55px] h-[55px]"
                                        src={p.images[0]}
                                        alt="image1"
                                      />
                                      <div className="flex text-sm flex-col justify-start items-start">
                                        <Link>{p.name.slice(0, 80)}...</Link>
                                        <p>
                                          <span>Thương hiệu: {p.brand}</span>
                                          <span className="pl-[7px]">
                                            Số lượng: {p.quantity}
                                          </span>
                                        </p>
                                      </div>
                                    </div>
                                    <div className="pl-4">
                                      <h2 className="text-md text-orange-500">
                                        {(
                                          p.price -
                                          Math.floor(
                                            (p.price * p.discount) / 100
                                          )
                                        ).toLocaleString("vi", {
                                          style: "currency",
                                          currency: "VND",
                                        })}
                                      </h2>
                                      <p className="line-through">
                                        {p.price.toLocaleString("vi", {
                                          style: "currency",
                                          currency: "VND",
                                        })}
                                      </p>
                                      <p>-{p.discount}%</p>
                                    </div>
                                    {q.delivery_status === "Đã Giao Hàng" && (
                                      <div className="pt-2 flex items-center justify-start md-lg:flex-col">
                                        <Link
                                          onClick={() => setOpen(true)}
                                          className={`rounded-md text-white bg-red-500 m-2 p-2 `}
                                          // to={`/product/details/${p.slug}`}
                                        >
                                          Đánh Giá
                                        </Link>
                                        <Link
                                          className={`border border-slate-500 rounded-md   m-2 p-2 `}
                                          to={`/dashboard/chat/${p.sellerId}`}
                                        >
                                          Liên hệ người bán
                                        </Link>
                                        <button
                                          // onClick={buyagain}
                                          className={`border border-slate-500 rounded-md  m-2 p-2 `}
                                        >
                                          Mua lại
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ) : (
                ""
              )
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Hoanthanh;
