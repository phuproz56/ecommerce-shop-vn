/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  messageClear,
  seller_order_status_update,
  get_seller_order,
} from "../../store/Reducers/OrderReducer";

const OrderDetails = () => {
  // const { userInfo } = useSelector((state) => state.auth);
  const _id = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { order, errorMessage, successMessage } = useSelector(
    (state) => state.order
  );

  useEffect(() => {
    // dispatch(get_admin_order(orderId));
    dispatch(get_seller_order(_id.orderId));
  }, [_id]);

  const [status, setStatus] = useState("");

  useEffect(() => {
    setStatus(order?.delivery_status);
  }, [order]);

  const status_update = (e) => {
    e.preventDefault();
    const user_email = order.shippingInfo.email;
    const order_date = order.date;
    const order_id = order._id && order._id.substring(0, 10).toUpperCase();
    // const seller_email = userInfo.email;
    if (order.delivery_status === "Chưa Xử Lí") {
      const config = {
        SecureToken: "f9473773-192c-4284-8cb3-cf7b77d1fb21",
        To: user_email,
        From: "phuproz348@gmail.com",
        Subject: `Shop-vn Gửi mail cho bạn về đơn hàng ${order_id}`,
        Body: `Đơn hàng: (${order_id}) của bạn được đặt vào ${order_date} đã được xử lí`,
      };
      if (window.Email) {
        window.Email.send(config).then((message) =>
          alert("Email đã gửi về cho khách hàng!")
        );
      }
    }

    dispatch(
      seller_order_status_update({
        _id: _id.orderId,
        info: { status: e.target.value },
      })
    );

    setStatus(e.target.value);
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage]);

  const back = () => {
    navigate(-1);
  };

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4  bg-[#283046] rounded-md">
        <p
          onClick={back}
          className="text-white border w-[100px] text-center rounded-md p-2 hover:bg-slate-500 cursor-pointer uppercase"
        >
          Quay lại
        </p>
        <div className="flex justify-between items-center p-4">
          <h2 className="text-xl text-[#d0d2d6]">Chi Tiết Đơn Hàng</h2>
          <select
            onChange={status_update}
            value={status}
            name=""
            id=""
            className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
          >
            <option value={order.delivery_status}>
              {order.delivery_status}
            </option>
            {order.delivery_status === "Chưa Xử Lí" ? (
              <option value="Đã Xử Lí">Đã Xử Lí</option>
            ) : order.delivery_status === "Đã Xử Lí" ? (
              <option value="Tìm Shipper">Tìm Shipper</option>
            ) : (
              ""
            )}

            {/* <option value="Vận Chuyển">Vận Chuyển</option>
            <option value="Đang Giao Hàng">Đang Giao Hàng</option>
            <option value="Đã Giao Hàng">Đã Giao Hàng</option>
            <option value="Hủy">Hủy</option> */}
          </select>
        </div>
        <div className="p-4">
          <div className="flex gap-2 text-lg text-[#d0d2d6]">
            <h2>
              Mã Đơn Hàng:{" "}
              {order?._id && order?._id.substring(0, 10).toUpperCase()} |
            </h2>
            <span>{order?.date}</span>
          </div>
          <div className="flex flex-wrap">
            <div className="w-[32%]">
              <div className="pr-3 text-[#d0d2d6] text-lg">
                <div className="flex flex-col gap-1">
                  <h2 className="pb-2 font-semibold">
                    Tên khách hàng: {order?.shippingInfo?.name}
                  </h2>
                  <p>
                    <span className="text-sm">
                      Nơi Giao Hàng : {order?.shippingInfo?.address1}{" "}
                      {order?.shippingInfo?.city}{" "}
                    </span>
                  </p>
                </div>
                <div className="flex justify-start items-center gap-3">
                  <h2>Trạng Thái Thanh Toán : </h2>
                  <span className="text-base">
                    {order?.payment_status === "paid" ? "Đã Thanh Toán" : order?.payment_status}
                  </span>
                </div>
                <span>
                  Giá :
                  {order?.price?.toLocaleString("vi", {
                    style: "currency",
                    currency: "VND",
                  })}
                </span>
                <div className="mt-4 flex flex-col gap-8">
                  <div className="text-[#d0d2d6]">
                    {order?.products &&
                      order.products.map((p, i) => (
                        <div key={i + 20} className="flex gap-3 text-md">
                          <img
                            className="w-[45px] h-[45px]"
                            src={p.images[0]}
                            alt=""
                          />
                          <div>
                            <h2>{p.name}</h2>
                            <p>
                              <span>Thương Hiệu : </span>
                              <span>{p.brand} </span>
                              <span className="text-lg">
                                Số Lượng : {p.quantity}
                              </span>
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
