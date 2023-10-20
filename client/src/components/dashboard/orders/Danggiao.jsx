/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import Orders from "../Orders";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { get_orders } from "../../../store/reducers/orderReducer";
import { useDispatch, useSelector } from "react-redux";
const Danggiao = () => {
  const dispatch = useDispatch();
  const { myOrders } = useSelector((state) => state.order);
  const { userInfo } = useSelector((state) => state.auth);
  const [state, setState] = useState("danggiao");

  useEffect(() => {
    if (state === "danggiao") {
      dispatch(get_orders({ customerId: userInfo.id, status: state }));
    }
  }, [state, userInfo.id]);
  console.log(myOrders);
  return (
    <div>
      <Orders />
      {myOrders.length ? (
        <div className="bg-white p-4 rounded-md w-full mt-5 justify-center">
          <div className="flex justify-between items-center w-full">
            <ul className="w-full">
              {myOrders.map((u, i) => (
                <li key={i} className="mt-3 border border-slate-300 rounded-md">
                  <div className="flex flex-col w-full ">
                    <div className="p-5 flex flex-col">
                      <h2 className="text-slate-600 font-semibold">
                        Đã mua vào ngày: <span>{u.date}</span>{" "}
                        <div className="text-end">
                          <Link to={``} className="pl-[100px] text-green-500">
                            {state}
                          </Link>
                          {u.delivery_status === "complete" && (
                            <b className="border-l-2 text-red-400 uppercase ml-4">
                              {" "}
                              hoàn thành
                            </b>
                          ) }
                        </div>
                      </h2>

                      <div className="gap-3">
                        <div className="flex flex-col gap-1">
                          <h2 className="text-slate-600 font-semibold">
                            Chuyển Đến: {u.shippingInfo?.name}
                          </h2>
                          <p>
                            <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                              Địa chỉ:{" "}
                            </span>
                            <span>
                              {u.shippingInfo?.address}{" "}
                              {u.shippingInfo?.country} {u.shippingInfo?.city}{" "}
                              {u.shippingInfo?.address1}{" "}
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
                            {u.products?.map((p, i) => (
                              <li>
                                <div className="flex flex-col w-full" key={i}>
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
                                        $
                                        {p.price -
                                          Math.floor(
                                            (p.price * p.discount) / 100
                                          )}
                                      </h2>
                                      <p>{p.price}</p>
                                      <p>-{p.discount}%</p>
                                    </div>
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
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="bg-white p-4 rounded-md w-full mt-5 justify-center">
          <div className="flex justify-between items-center w-full">
            <h1 className="justify-items-center text-center text-lg">
              Chưa có đơn hàng!
            </h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default Danggiao;
