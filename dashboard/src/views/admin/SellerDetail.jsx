import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import {
  get_seller,
  seller_status_update,
  messageClear,
} from "../../store/Reducers/sellerReducer";

const SellerDetails = () => {
  const dispatch = useDispatch();
  const { seller, successMessage } = useSelector((state) => state.seller);
  
  const { sellerId } = useParams();
  useEffect(() => {
    dispatch(get_seller(sellerId));
  }, [sellerId, dispatch]);

  const [status, setStatus] = useState("");

  const submit = (e) => {
    e.preventDefault();
    dispatch(
      seller_status_update({
        sellerId,
        status,
      })
    );
  };
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
  }, [successMessage, dispatch]);
  useEffect(() => {
    if (seller) {
      setStatus(seller.status);
    }
  }, [seller]);
  return (
    <div>
      <div className="px-2 lg:px-7 pt-5">
        <div className="w-full p-4  bg-[#283046] rounded-md">
          <div className="w-full flex flex-wrap text-[#d0d2d6]">
            <div className="w-3/12 flex justify-center items-center py-3">
              <div>
                {seller?.image ? (
                  <img
                    className="w-full h-[230px]"
                    src="/images/admin.jpg"
                    alt=""
                  />
                ) : (
                  <span>chưa upload ảnh đại diện</span>
                )}
              </div>
            </div>
            <div className="w-4/12">
              <div className="px-0 md:px-5 py-2">
                <div className="py-2 text-lg">
                  <h2>Thông tin căn bản</h2>
                </div>
                <div className="flex justify-between text-sm flex-col gap-2 p-4 bg-slate-800 rounded-md">
                  <div className="flex gap-2">
                    <span>tên : </span>
                    <span>{seller?.name}</span>
                  </div>
                  <div className="flex gap-2">
                    <span>Email : </span>
                    <span>{seller?.email}</span>
                  </div>
                  <div className="flex gap-2">
                    <span>vai trò : </span>
                    <span>{seller?.role}</span>
                  </div>
                  <div className="flex gap-2">
                    <span>trạng thái : </span>
                    <span>{seller?.status}</span>
                  </div>
                  <div className="flex gap-2">
                    <span>tài khoản ngân hàng: </span>
                    <span>{seller?.payment}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-4/12">
              <div className="px-0 md:px-5 py-2">
                <div className="py-2 text-lg">
                  <h2>Địa chỉ</h2>
                </div>
                <div className="flex justify-between text-sm flex-col gap-2 p-4 bg-slate-800 rounded-md">
                  <div className="flex gap-2">
                    <span>Tên shop : </span>
                    <span>{seller?.shopInfo?.shopName}</span>
                  </div>
                  <div className="flex gap-2">
                    <span>Phân công : </span>
                    <span>{seller?.shopInfo?.division}</span>
                  </div>
                  <div className="flex gap-2">
                    <span>Địa chỉ 1 : </span>
                    <span>{seller?.shopInfo?.district}</span>
                  </div>
                  <div className="flex gap-2">
                    <span>Địa chỉ 2 : </span>
                    <span>{seller?.shopInfo?.sub_district}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <form onSubmit={submit}>
              <div className="flex gap-4 py-3">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                  name=""
                  required
                  id=""
                >
                  <option value="">--Chọn trạng thái--</option>
                  <option value="active">Active</option>
                  <option value="deactive">Deactive</option>
                </select>
                <button className="bg-blue-500 hover:shadow-blue-500/50 hover:shadow-lg text-white rounded-md px-7 py-2 w-[170px] ">
                  Xác Nhận
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDetails;
