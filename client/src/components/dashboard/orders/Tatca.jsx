import Orders from "../Orders";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  get_all_orders,
  huy_order,
  messageClear,
} from "../../../store/reducers/orderReducer";
import toast from "react-hot-toast";
const Tatca = () => {
  const dispatch = useDispatch();
  const { allOrders, successMessage } = useSelector((state) => state.order);
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo && userInfo.id) {
      dispatch(get_all_orders({ customerId: userInfo.id }));
    }
  }, [userInfo, dispatch]);

  const huydonhang = (id) => {
    dispatch(huy_order({ orderId: id }));

    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      messageClear();
    }
  }, [successMessage]);

  return (
    <div>
      <Orders />
      {allOrders.length ? (
        <div className="bg-white p-4 rounded-md w-full mt-5">
          <div className="flex w-full">
            <ul className="w-full">
              {allOrders.map((u, i) => (
                <li
                  key={`${u.id}_${i}`}
                  className="mt-3 border border-slate-300 rounded-md w-full"
                >
                  <div className="flex flex-col w-full ">
                    <div className="p-5 flex flex-col justify-items-center pl-3">
                      <h2 className="text-slate-600 font-semibold">
                        Đã mua vào ngày: <span>{u.date}</span>{" "}
                        <div className="text-end">
                          <Link to={``} className="pl-[100px] text-green-500">
                            {u.delivery_status}
                          </Link>
                          {u.delivery_status === "Đã Giao Hàng" && (
                            <b className="border-l-2 text-red-400 uppercase ml-4">
                              hoàn thành
                            </b>
                          )}
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
                              <li key={`${u.id}_${i}`}>
                                <div
                                  className="flex flex-col w-full"
                                  key={`${u.id}_${i}`}
                                >
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
                                    {u.delivery_status === "Đã Giao Hàng" && (
                                      <div className="pt-2 flex items-center">
                                        <Link
                                          className={`rounded-md text-white bg-red-500 m-2 p-2 `}
                                          to={`/product/details/${p.slug}`}
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
                  {(u.delivery_status === "Hủy" ||
                  u.delivery_status === "Đã Giao Hàng" || u.delivery_status === "Đang Giao Hàng" ) ? (
                    ""
                  ) : (
                    <button
                      onClick={() => huydonhang(u._id)}
                      className={`rounded-md text-white bg-red-500 m-2 p-2`}
                    >
                      Hủy Đơn Hàng
                    </button>
                  )}
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

export default Tatca;