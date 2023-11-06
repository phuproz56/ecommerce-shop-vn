/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { FaEye, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";
import { useDispatch, useSelector } from "react-redux";
import { get_request } from "../../store/Reducers/OrderReducer";
import { Tooltip } from "antd";
import toast from "react-hot-toast";
import moment from "moment";

const Request = () => {
  const dispatch = useDispatch();

  const { all_order, all_request } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(get_request());
  }, []);

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4  bg-[#283046] rounded-md">
        {!all_request.length && (
          <p className="text-lg text-white">Chưa có yêu cầu trả hàng</p>
        )}
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-[#d0d2d6]">
            <thead className="text-xs text-[#d0d2d6] uppercase border-b border-slate-700">
              <tr>
                <th scope="col" className="py-3 px-4">
                  No
                </th>
                <th scope="col" className="py-3 px-4">
                  hình ảnh
                </th>
                <th scope="col" className="py-3 px-4">
                  tên
                </th>
                <th scope="col" className="py-3 px-4">
                  số điện thoại
                </th>
                <th scope="col" className="py-3 px-4">
                  Yêu cầu
                </th>
                <th scope="col" className="py-3 px-4">
                  
                </th>
              </tr>
            </thead>
            <tbody className="text-sm font-normal">
              {all_order?.map((d, i) => (
                <tr key={i}>
                  <th
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    {i + 1}
                  </th>
                  <th
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    <img
                      className="w-[45px] h-[45px]"
                      src={d.image ? d.image : "/images/seller.png"}
                      alt="img_seller"
                    />
                  </th>
                  <th
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    <span>{d?.shippingInfo?.name}</span>
                  </th>

                  <th
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    <span>{d?.shippingInfo?.phoneNumber}</span>
                  </th>
                  {all_request.map((u) => (
                    <>
                      <th
                        scope="row"
                        className="py-1 px-4 font-medium whitespace-nowrap"
                      >
                        <span>
                          <Tooltip title={u?.information}>
                            {u?.information?.slice(0, 12)}...
                          </Tooltip>
                        </span>
                      </th>

                      <th
                        scope="row"
                        className="py-1 px-4 font-medium whitespace-nowrap"
                      >
                        {d.delivery_status === "Xác Nhận Trả Hàng" ? (
                          <p>Đã Xác Nhận Trả Hàng vào ngày: {moment(d.updatedAt).format("LLL")}</p>
                        ) : (
                          <div className="flex justify-start items-center gap-4">
                            <Tooltip title="Xem Chi Tiết Đơn Hàng">
                              <Link
                                to={`/seller/dashboard/request/details/${u.orderId}`}
                                className="p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50"
                              >
                                <FaEye />
                              </Link>
                            </Tooltip>
                          </div>
                        )}
                      </th>
                    </>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Request;
