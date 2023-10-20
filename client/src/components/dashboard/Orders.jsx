import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { get_orders } from "../../store/reducers/orderReducer";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../Pagination";
import Tatca from "./orders/Tatca";

const Orders = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { myOrders, totalOrders } = useSelector((state) => state.order);
  const [state, setState] = useState("all");

  const [pageNumber, setPageNumber] = useState(1);
  useEffect(() => {
    dispatch(
      get_orders({
        pageNumber,
        status: state,
        customerId: userInfo.id,
      })
    );
  }, [dispatch, pageNumber, state, userInfo.id]);

  const redirect = (ord) => {
    let items = 0;
    for (let i = 0; i < ord.length; i++) {
      items = ord.products[i].quantity + items;
    }
    navigate("/payment", {
      state: {
        price: ord.price,
        items,
        orderId: ord._id,
      },
    });
  };

  return (
    <div className="bg-white p-4 rounded-md w-full">
      <div className="flex justify-between items-center w-full">
        <div className="md-lg:w-full w-full">
          <div className="flex justify-between md-lg:justify-center items-center flex-wrap pl-8">
            <ul className="flex justify-start items-start gap-20 text-sm font-bold uppercase">
              <li>
                <Link
                  to="/dashboard/my-orders/tatca"
                  className={`p-2 block ${
                    pathname === "/dashboard/my-orders/tatca"
                      ? "text-[#7fad39]"
                      : "text-slate-600"
                  }`}
                >
                  tất cả
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/my-orders/chothanhtoan"
                  className={`p-2 block ${
                    pathname === "/dashboard/my-orders/chothanhtoan"
                      ? "text-[#7fad39]"
                      : "text-slate-600"
                  }`}
                >
                  chờ thanh toán
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/my-orders/vanchuyen"
                  className={`p-2 block ${
                    pathname === "/dashboard/my-orders/vanchuyen" ? "text-[#7fad39]" : "text-slate-600"
                  }`}
                >
                  vận chuyển
                </Link>
              </li>
              <li>
                <Link to="/dashboard/my-orders/danggiao"
                  className={`p-2 block ${
                    pathname === "/dashboard/my-orders/danggiao" ? "text-[#7fad39]" : "text-slate-600"
                  }`}
                >
                  đang giao
                </Link>
              </li>
              <li>
                <Link
                to="/dashboard/my-orders/hoanthanh"
                  className={`p-2 block ${
                    pathname === "/dashboard/my-orders/hoanthanh"
                      ? "text-[#7fad39]"
                      : "text-slate-600"
                  }`}
                >
                  hoàn thành
                </Link>
              </li>
              <li>
                <Link
                to="/dashboard/my-orders/dahuy"
                  className={`p-2 block ${
                    pathname === "/dashboard/my-orders/dahuy"
                      ? "text-[#7fad39]"
                      : "text-slate-600"
                  }`}
                >
                  đã hủy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        {/* <h2 className="text-xl font-semibold text-slate-600">My Orders</h2>
        <select
          className="outline-none px-3 py-1 border rounded-md  text-slate-600"
          name=""
          id=""
          value={state}
          onChange={(e) => setState(e.target.value)}
        >
          <option value="all">---order status---</option>
          <option value="placed">Placed</option>
          <option value="pending">pending</option>
          <option value="cancelled">Cancelled</option>
          <option value="warehouse">Warehouse</option>
        </select>
      </div>
      <div className="pt-4 ">
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-3" scope="col">
                  Order Id
                </th>
                <th className="px-6 py-3" scope="col">
                  Price
                </th>
                <th className="px-6 py-3" scope="col">
                  Payment status
                </th>
                <th className="px-6 py-3" scope="col">
                  Order status
                </th>
                <th className="px-6 py-3" scope="col">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {myOrders.map((o, i) => (
                <tr key={i} className="bg-white border-b">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap"
                  >
                    {o._id}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap"
                  >
                    ${o.price}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap"
                  >
                    {o.payment_status}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap"
                  >
                    {o.delivery_status}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap"
                  >
                    <Link to={`/dashboard/order/details/${o._id}`}>
                      <span className="bg-green-100 text-green-800 text-sm font-normal mr-2 px-2.5 py-[1px] rounded">
                        View
                      </span>
                    </Link>
                    {o.payment_status !== "paid" && (
                      <span
                        onClick={() => redirect(o)}
                        className="bg-green-100 text-green-800 text-sm font-normal mr-2 px-2.5 py-[1px] rounded cursor-pointer"
                      >
                        Mua Ngay
                      </span>
                    )}
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end pt-4">
          {totalOrders >= 5 && (
            <Pagination
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
              totalItem={totalOrders}
              parPage={5}
              showItem={Math.round(totalOrders / 5)}
            />
          )}
        </div> */}
      </div>
    </div>
  );
};

export default Orders;
