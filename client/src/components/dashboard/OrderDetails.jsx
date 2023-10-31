import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FcTodoList,
  FcMoneyTransfer,
  FcAcceptDatabase,
  FcPrevious,
} from "react-icons/fc";
import { get_order } from "../../store/reducers/orderReducer";
import { useDispatch, useSelector } from "react-redux";
import { MdLocalShipping } from "react-icons/md";
import { AiOutlineCheck } from "react-icons/ai";
import moment from "moment";

const OrderDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orderId } = useParams();
  const { myOrder } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(get_order(orderId));
  }, [dispatch, orderId]);

  const goBack = () => {
    navigate(-1); // Sử dụng navigate(-1) để quay lại trang trước đó
  };

  return (
    <div className="bg-white p-4">
      <div className="flex bg-white w-auto justify-between items-center border-b-2 border-red-400 pb-4">
        <button
          onClick={goBack}
          className="flex justify-items-center w-[110px] border p-3 uppercase rounded-md text-slate-500"
        >
          <FcPrevious className="pt-2" /> trở lại
        </button>
        <div className="flex justify-items-end uppercase">
          <p className="flex items-end pr-2">Mã đơn hàng: {orderId}</p>
          <p className="flex border-l-2 pl-2 text-red-500">
            {myOrder[0]?.delivery_status === "Đã Giao Hàng"
              ? "Đơn hàng đã hoàn thành"
              : myOrder[0]?.delivery_status === "Hủy"
              ? "Đơn hàng đã hủy"
              : "Đơn hàng chưa hoàn thành"}
          </p>
        </div>
      </div>
      <div className=" flex-row pt-[50px] flex">
        <div>
          <FcTodoList
            className={` p-2 border-4 ${
              myOrder[0]?.delivery_status === "Hủy"
                ? "border-slate-500"
                : "border-green-500"
            } rounded-full`}
            style={{ fontSize: "80px" }}
          />
          Đơn Hàng Đã Đặt <p className="text-slate-400">{myOrder[0]?.date}</p>
        </div>
        <div
          className={`w-full border-t-4 ${
            myOrder[0]?.delivery_status === "Hủy"
              ? "border-slate-500"
              : "border-green-500"
          } mt-[40px]`}
        ></div>
        <div>
          <FcMoneyTransfer
            className={`p-2 border-4 ${
              myOrder[0]?.delivery_status === "Hủy"
                ? "border-slate-500"
                : "border-green-500"
            }  rounded-full`}
            style={{ fontSize: "80px" }}
          />
          Đã Xác Nhận Thông Tin Thanh Toán
          <p className="text-slate-400">{moment(myOrder[0]?.updatedAt).format("LLL")}</p>
        </div>
        <div
          className={`w-full border-t-4 ${
            myOrder[0]?.delivery_status === "Vận Chuyển" ||
            myOrder[0]?.delivery_status === "Đang Giao Hàng" ||
            myOrder[0]?.delivery_status === "Đã Giao Hàng"
              ? "border-green-500"
              : "border-slate-500"
          } mt-[40px]`}
        ></div>
        <div>
          <MdLocalShipping
            className={`p-2 border-4 ${
              myOrder[0]?.delivery_status === "Vận Chuyển" ||
              myOrder[0]?.delivery_status === "Đang Giao Hàng" ||
              myOrder[0]?.delivery_status === "Đã Giao Hàng"
                ? "border-green-500"
                : "border-slate-500"
            } rounded-full`}
            style={
              myOrder[0]?.delivery_status === "Vận Chuyển" ||
              myOrder[0]?.delivery_status === "Đang Giao Hàng" ||
              myOrder[0]?.delivery_status === "Đã Giao Hàng"
                ? { fontSize: "80px", color: "green" }
                : { fontSize: "80px", color: "slategray" }
            }
          />
          <p>Đã Giao Cho ĐVVC</p>
        </div>
        <div
          className={`w-full border-t-4 ${
            myOrder[0]?.delivery_status === "Đã Giao Hàng"
              ? "border-green-500"
              : "border-slate-500"
          } mt-[40px]`}
        ></div>
        <div>
          <FcAcceptDatabase
            className={`p-2 border-4 ${
              myOrder[0]?.delivery_status === "Đã Giao Hàng"
                ? "border-green-500"
                : "border-slate-500"
            } rounded-full`}
            style={{ fontSize: "80px" }}
          />
          <p>Đã Nhận Được Hàng</p>
        </div>
        <div
          className={`w-full border-t-4 ${
            myOrder[0]?.delivery_status === "Đã Giao Hàng"
              ? "border-green-500"
              : "border-slate-500"
          } mt-[40px]`}
        ></div>
        <div>
          <AiOutlineCheck
            className={`p-2 border-4 ${
              myOrder[0]?.delivery_status === "Đã Giao Hàng"
                ? "border-green-500"
                : "border-slate-500"
            } rounded-full`}
            style={
              myOrder[0]?.delivery_status === "Đã Giao Hàng"
                ? { fontSize: "80px", color: "green" }
                : { fontSize: "80px", color: "slategray" }
            }
          />
          <p>Đơn Hàng Đã Hoàn Thành</p>
        </div>
      </div>
      <div className="pt-4">
        Cảm ơn bạn đã mua hàng của Shop-vn
        <div></div>
      </div>
    </div>
  );
};

export default OrderDetails;
