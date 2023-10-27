/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Orders = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [state, setState] = useState("");

  return (
    <div className="bg-white p-4 rounded-md w-full">
      <div className="flex justify-between items-center w-full">
        <div className="md-lg:w-full w-full">
          <div className="flex justify-between md-lg:justify-center items-center flex-wrap pl-8">
            <ul className="flex justify-start items-start gap-20 text-sm font-bold uppercase">
              <li>
                <Link
                  to="/dashboard/tatca"
                  className={`p-2 block ${
                    pathname === "/dashboard/tatca"
                      ? "text-[#7fad39]"
                      : "text-slate-600"
                  }`}
                >
                  tất cả
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/choxuly"
                  className={`p-2 block ${
                    pathname === "/dashboard/choxuly"
                      ? "text-[#7fad39]"
                      : "text-slate-600"
                  }`}
                >
                  chờ xử lý
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/vanchuyen"
                  className={`p-2 block ${
                    pathname === "/dashboard/vanchuyen"
                      ? "text-[#7fad39]"
                      : "text-slate-600"
                  }`}
                >
                  vận chuyển
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/danggiao"
                  className={`p-2 block ${
                    pathname === "/dashboard/danggiao"
                      ? "text-[#7fad39]"
                      : "text-slate-600"
                  }`}
                >
                  đang giao
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/hoanthanh"
                  className={`p-2 block ${
                    pathname === "/dashboard/hoanthanh"
                      ? "text-[#7fad39]"
                      : "text-slate-600"
                  }`}
                >
                  hoàn thành
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/dahuy"
                  className={`p-2 block ${
                    pathname === "/dashboard/dahuy"
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
      </div>
    </div>
  );
};

export default Orders;
