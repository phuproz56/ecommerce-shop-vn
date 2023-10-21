/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
// import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { get_dashboard_index_data } from "../../store/reducers/dashboardReducer";

const Index = () => {
  // const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const { totalOrder, cancelledOrder, pendingOrder, recentOrders } =
    useSelector((state) => state.dashboard);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get_dashboard_index_data(userInfo.id));
  }, [dispatch]);

  // const redirect = (ord) => {
  //   let items = 0;
  //   for (let i = 0; i < ord.length; i++) {
  //     items = ord.products[i].quantity + items;
  //   }
  //   navigate("/payment", {
  //     state: {
  //       price: ord.price,
  //       items,
  //       orderId: ord._id,
  //     },
  //   });
  // };
  return (
    <div>
      <div className="grid grid-cols-3 md:grid-cols-1 gap-5">
        <div className="flex justify-center items-center p-5 bg-white rounded-md gap-5">
          <div className="bg-green-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl">
            <span className="text-xl text-green-800">
              <AiOutlineShoppingCart />
            </span>
          </div>
          <div className="flex flex-col justify-start items-start text-slate-600">
            <h2 className="text-3xl font-bold">{totalOrder}</h2>
            <span>Tổng Đơn Hàng</span>
          </div>
        </div>
        <div className="flex justify-center items-center p-5 bg-white rounded-md gap-5">
          <div className="bg-blue-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl">
            <span className="text-xl text-blue-800">
              <AiOutlineShoppingCart />
            </span>
          </div>
          <div className="flex flex-col justify-start items-start text-slate-600">
            <h2 className="text-3xl font-bold">{pendingOrder}</h2>
            <span>Đơn Hàng Chưa Xét Duyệt</span>
          </div>
        </div>
        <div className="flex justify-center items-center p-5 bg-white rounded-md gap-5">
          <div className="bg-red-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl">
            <span className="text-xl text-red-800">
              <AiOutlineShoppingCart />
            </span>
          </div>
          <div className="flex flex-col justify-start items-start text-slate-600">
            <h2 className="text-3xl font-bold">{cancelledOrder}</h2>
            <span>Đơn Hàng Đã Hủy</span>
          </div>
        </div>
      </div>
      <div className="bg-white p-5 mt-5 rounded-md">
        <h2 className="text-lg font-semibold text-slate-600">
          Những đơn đặt hàng gần đây
        </h2>
        <div className="pt-4 ">
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-6 py-3" scope="col">
                    Đơn Hàng Id
                  </th>
                  <th className="px-6 py-3" scope="col">
                    Giá
                  </th>
                  <th className="px-6 py-3" scope="col">
                    Trạng Thái Thanh Toán
                  </th>
                  <th className="px-6 py-3" scope="col">
                    Trạng Thái Đơn Hàng
                  </th>
                  {/* <th className="px-6 py-3" scope="col">
                    Hành Động
                  </th> */}
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((o, i) => (
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
                      {o.payment_status === "unpaid" ? "Chưa Thanh Toán" : ""}
                      {o.payment_status === "paid" ? "Đã Thanh Toán" : ""}
                    </th>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium whitespace-nowrap"
                    >
                      {o.delivery_status === "pending"
                        ? "Đang Xử Lý Đơn Hàng"
                        : ""}
                      {o.delivery_status === "processing"
                        ? "Đã Xử Lý Đơn Hàng"
                        : ""}
                      {o.delivery_status === "cancelled" ? "Đã Hủy" : ""}
                      {o.delivery_status === "vanchuyen"
                        ? "Đang Vận Chuyển"
                        : ""}
                      {o.delivery_status === "danggiao"
                        ? "Đơn Hàng Đang Giao"
                        : ""}
                      {o.delivery_status === "complete" ? "Hoàn Thành" : ""}
                    </th>
                    {/* <th
                      scope="row"
                      className="px-6 py-4 font-medium whitespace-nowrap"
                    >
                      <Link to={`/dashboard/order/details/${o._id}`}>
                        <span className="bg-green-100 text-green-800 text-sm font-normal mr-2 px-2.5 py-[1px] rounded">
                          Xem
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
                    </th> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
