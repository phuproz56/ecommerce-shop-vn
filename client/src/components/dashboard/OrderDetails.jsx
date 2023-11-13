import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FcTodoList,
  FcMoneyTransfer,
  FcAcceptDatabase,
  FcPrevious,
} from "react-icons/fc";
import {
  get_order,
  messageClear,
  submit_request,
} from "../../store/reducers/orderReducer";
import { useDispatch, useSelector } from "react-redux";
import { MdLocalShipping } from "react-icons/md";
import { AiOutlineCheck } from "react-icons/ai";
import moment from "moment";
import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import toast from "react-hot-toast";
import dayjs from "dayjs";

const OrderDetails = () => {
  const [open_request, setOpen_request] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orderId } = useParams();
  const { myOrder, successMessage, request } = useSelector(
    (state) => state.order
  );
  const { userInfo } = useSelector((state) => state.auth);

  const [state, setState] = useState({
    information: "",
  });

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    dispatch(get_order(orderId));
  }, [dispatch, orderId]);

  const goBack = () => {
    navigate(-1); // Sử dụng navigate(-1) để quay lại trang trước đó
  };

  const submit = (e) => {
    e.preventDefault();
    const obj = {
      userId: userInfo.id,
      orderId: orderId,
      information: state.information,
    };
    dispatch(submit_request(obj));
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      setOpen_request(false);
    }
  }, [dispatch, successMessage]);

  return (
    <div className="bg-white p-4">
      {open_request && (
        <form onSubmit={submit}>
          <div className="fixed w-full h-screen bg-[#0000004b] top-0 left-0 flex items-center justify-center ">
            <div className="w-auto h-auto bg-white rounded shadow relative p-4">
              <div className="w-full flex justify-end p-3">
                <RxCross1
                  size={30}
                  className="cursor-pointer"
                  onClick={() => setOpen_request(false)}
                />
              </div>
              <h1 className="items-center text-[25px]">
                Vui lòng ghi lý do trả hàng
              </h1>

              <textarea
                className="w-full px-4 py-2 focus:border-indigo-500 outline-none border border-slate-700 rounded-md"
                placeholder="lý do... (giới hạn 250 ký tự)"
                name="information"
                id="information"
                value={state.information}
                onChange={inputHandle}
                maxLength="250"
              ></textarea>
              <button className="bg-blue-500 hover:shadow-blue-500/50 hover:shadow-lg text-white rounded-md px-7 py-2 w-[170px] ">
                Xác Nhận
              </button>
            </div>
          </div>
        </form>
      )}
      <div className="flex bg-white w-auto justify-between items-center border-b-2 border-red-400 pb-4 sm:flex-col sm:items-start">
        <button
          onClick={goBack}
          className="flex justify-items-start w-[110px] border p-3 uppercase rounded-md text-slate-500 sm:w-[100px]"
        >
          <FcPrevious className="pt-2" /> trở lại
        </button>
        <div className="flex justify-items-end uppercase sm:w-full">
          <p className="flex items-end pr-2">
            Mã đơn hàng: {orderId && orderId.substring(0, 10)}
          </p>
          <p className="flex border-l-2 pl-2 text-red-500">
            {myOrder?.delivery_status === "Đã Giao Hàng"
              ? "Đơn hàng đã hoàn thành"
              : myOrder?.delivery_status === "Hủy"
              ? "Đơn hàng đã hủy"
              : myOrder?.delivery_status === "Yêu Cầu Trả Hàng"
              ? "Đơn hàng đã hoàn thành"
              : myOrder?.delivery_status === "Xác Nhận Trả Hàng"
              ? "Đã Trả Hàng"
              : "Đơn hàng chưa hoàn thành"}
          </p>
        </div>
      </div>
      <div className=" flex-row pt-[50px] flex sm:flex-col">
        <div className="sm:flex-col">
          <FcTodoList
            className={`sm:flex-row p-2 border-4 ${
              myOrder?.delivery_status === "Hủy"
                ? "border-slate-500"
                : "border-green-500"
            } rounded-full`}
            style={{ fontSize: "80px" }}
          />
          Đơn Hàng Đã Đặt <p className="text-slate-400">{myOrder?.date}</p>
        </div>
        <div
          className={`w-full sm:hidden border-t-4 ${
            myOrder?.delivery_status === "Hủy"
              ? "border-slate-500"
              : "border-green-500"
          } mt-[40px]`}
        ></div>
        <div>
          <FcMoneyTransfer
            className={`p-2 border-4 ${
              myOrder?.delivery_status === "Hủy"
                ? "border-slate-500"
                : "border-green-500"
            }  rounded-full`}
            style={{ fontSize: "80px" }}
          />
          Đã Xác Nhận Thông Tin Thanh Toán
          <p className="text-slate-400">
            {moment(myOrder?.updatedAt).format("LLL")}
          </p>
        </div>
        <div
          className={`w-full sm:hidden border-t-4 ${
            myOrder?.delivery_status === "Vận Chuyển" ||
            myOrder?.delivery_status === "Đang Giao Hàng" ||
            myOrder?.delivery_status === "Đã Giao Hàng" ||
            myOrder?.delivery_status === "Xác Nhận Trả Hàng" ||
            myOrder?.delivery_status === "Giao Hàng Thành Công" ||
            myOrder?.delivery_status === "Yêu Cầu Trả Hàng"
              ? "border-green-500"
              : "border-slate-500"
          } mt-[40px]`}
        ></div>
        <div>
          <MdLocalShipping
            className={`p-2 border-4 ${
              myOrder?.delivery_status === "Vận Chuyển" ||
              myOrder?.delivery_status === "Đang Giao Hàng" ||
              myOrder?.delivery_status === "Đã Giao Hàng" ||
              myOrder?.delivery_status === "Xác Nhận Trả Hàng" ||
              myOrder?.delivery_status === "Giao Hàng Thành Công" ||
              myOrder?.delivery_status === "Yêu Cầu Trả Hàng"
                ? "border-green-500"
                : "border-slate-500"
            } rounded-full`}
            style={
              myOrder?.delivery_status === "Vận Chuyển" ||
              myOrder?.delivery_status === "Đang Giao Hàng" ||
              myOrder?.delivery_status === "Đã Giao Hàng" ||
              myOrder?.delivery_status === "Xác Nhận Trả Hàng" ||
              myOrder?.delivery_status === "Giao Hàng Thành Công" ||
              myOrder?.delivery_status === "Yêu Cầu Trả Hàng"
                ? { fontSize: "80px", color: "green" }
                : { fontSize: "80px", color: "slategray" }
            }
          />
          <p>Đã Giao Cho ĐVVC</p>
        </div>
        <div
          className={`w-full sm:hidden border-t-4 ${
            myOrder?.delivery_status === "Giao Hàng Thành Công" ||
            myOrder?.delivery_status === "Đã Giao Hàng" ||
            myOrder?.delivery_status === "Xác Nhận Trả Hàng" ||
            myOrder?.delivery_status === "Giao Hàng Thành Công" ||
            myOrder?.delivery_status === "Yêu Cầu Trả Hàng"
              ? "border-green-500"
              : "border-slate-500"
          } mt-[40px]`}
        ></div>
        <div>
          <FcAcceptDatabase
            className={`p-2 border-4 ${
              myOrder?.delivery_status === "Giao Hàng Thành Công" ||
              myOrder?.delivery_status === "Đã Giao Hàng" ||
              myOrder?.delivery_status === "Xác Nhận Trả Hàng" ||
              myOrder?.delivery_status === "Giao Hàng Thành Công" ||
              myOrder?.delivery_status === "Yêu Cầu Trả Hàng"
                ? "border-green-500"
                : "border-slate-500"
            } rounded-full`}
            style={{ fontSize: "80px" }}
          />
          <p>Đã Nhận Được Hàng</p>
        </div>
        <div
          className={`w-full sm:hidden border-t-4 ${
            myOrder?.delivery_status === "Đã Giao Hàng" ||
            myOrder?.delivery_status === "Xác Nhận Trả Hàng" ||
            myOrder?.delivery_status === "Yêu Cầu Trả Hàng"
              ? "border-green-500"
              : "border-slate-500"
          } mt-[40px]`}
        ></div>
        <div>
          <AiOutlineCheck
            className={`p-2 border-4 ${
              myOrder?.delivery_status === "Đã Giao Hàng" ||
              myOrder?.delivery_status === "Xác Nhận Trả Hàng" ||
              myOrder?.delivery_status === "Yêu Cầu Trả Hàng"
                ? "border-green-500"
                : "border-slate-500"
            } rounded-full`}
            style={
              myOrder?.delivery_status === "Đã Giao Hàng" ||
              myOrder?.delivery_status === "Xác Nhận Trả Hàng" ||
              myOrder?.delivery_status === "Yêu Cầu Trả Hàng"
                ? { fontSize: "80px", color: "green" }
                : { fontSize: "80px", color: "slategray" }
            }
          />
          {myOrder?.delivery_status === "Xác Nhận Trả Hàng" ? (
            <p>Đã Trả Hàng</p>
          ) : (
            <p>Đơn Hàng Đã Hoàn Thành</p>
          )}
        </div>
      </div>
      <div className="pt-4">
        Cảm ơn bạn đã mua hàng của Shop-vn
        <div></div>
      </div>

      {myOrder?.delivery_status === "Đã Giao Hàng" ? (
        <button
          onClick={() => setOpen_request(true)}
          className={`border bg-orange-500 text-white rounded-md  m-2 p-2 `}
        >
          Yêu cầu trả hàng
        </button>
      ) : myOrder?.delivery_status === "Yêu Cầu Trả Hàng" ||
        myOrder?.delivery_status === "Xác Nhận Trả Hàng" ? (
        <p className="pt-2">
          bạn đã gửi yêu cầu trả hàng vào:{" "}
          {dayjs(request?.createdAt).format("D/MM/YYYY")}
        </p>
      ) : (
        ""
      )}
    </div>
  );
};

export default OrderDetails;
