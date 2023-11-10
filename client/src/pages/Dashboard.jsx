/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Headers from "../components/Headers";
import Footer from "../components/Footer";
import { FaList } from "react-icons/fa";
import { FaAddressBook } from "react-icons/fa6";
import { RxDashboard } from "react-icons/rx";
import { RiProductHuntLine } from "react-icons/ri";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { BsChat, BsHeart } from "react-icons/bs";
import { TfiLock } from "react-icons/tfi";
import { BiLogInCircle } from "react-icons/bi";
import { RiCoupon2Line } from "react-icons/ri";
import api from "../api/api";
import { useDispatch, useSelector } from "react-redux";
import { user_reset } from "../store/reducers/authReducer";
import { reset_count } from "../store/reducers/cardReducer";
import { ImProfile } from "react-icons/im";
import toast from "react-hot-toast";

const Dashboard = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [filterShow, setFilterShow] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);

  const logout = async () => {
    try {
      const { data } = await api.get("/customer/logout");
      localStorage.removeItem("customerToken");
      dispatch(user_reset());
      dispatch(reset_count());
      toast.success("Đăng Xuất thành công!!");
      navigate("/login");
    } catch (error) {
      console.log(error.response.data);
    }
  };
  console.log(userInfo.email_verified)

  return (
    <div>
      <Headers /> {/*  Cum here  */}
      <div className="bg-slate-200 mt-5 ">
        <div className="w-[90%] mx-auto pt-5 md-lg:block hidden">
          <div>
            <button
              onClick={() => setFilterShow(!filterShow)}
              className="text-center py-3 px-3 bg-indigo-500 text-white "
            >
              <FaList />
            </button>
          </div>
        </div>
        <div className="h-full mx-auto z-20">
          <div className="py-5 flex md-lg:w-[90%] mx-auto relative ">
            <div
              className={`rounded-md z-50 md-lg:absolute ${
                filterShow ? "-left-4" : "-left-[360px]"
              } w-[270px] ml-4 bg-white`}
            >
              <ul className="py-2 text-slate-600 px-4">
                <li
                  className={`flex justify-start items-center gap-2 py-2 ${
                    pathname === "/dashboard" ? "text-green-500" : ""
                  }`}
                >
                  <span className="text-xl">
                    <RxDashboard />
                  </span>
                  <Link
                    to="/dashboard"
                    className={`block ${
                      pathname === "/dashboard"
                        ? "border-b-2 border-green-500"
                        : ""
                    }`}
                  >
                    Dashboard
                  </Link>
                </li>
                <li
                  className={`flex justify-start items-center gap-2 py-2 ${
                    pathname === "/dashboard/address" ? "text-green-500" : ""
                  }`}
                >
                  <span className="text-xl">
                    <FaAddressBook />
                  </span>
                  <Link
                    to="/dashboard/address"
                    className={`block ${
                      pathname === "/dashboard/address"
                        ? "border-b-2 border-green-500"
                        : ""
                    }`}
                  >
                    Địa Chỉ
                  </Link>
                </li>
                <li
                  className={`flex justify-start items-center gap-2 py-2 ${
                    pathname === "/dashboard/coupon" ? "text-green-500" : ""
                  }`}
                >
                  <span className="text-xl">
                    <RiCoupon2Line />
                  </span>
                  <Link
                    to="/dashboard/coupon"
                    className={`block ${
                      pathname === "/dashboard/coupon"
                        ? "border-b-2 border-green-500"
                        : ""
                    }`}
                  >
                    Mã Giảm Giá
                  </Link>
                </li>
                <li
                  className={`flex justify-start items-center gap-2 py-2 ${
                    pathname === "/dashboard/tatca" ||
                    pathname === "/dashboard/choxuly" ||
                    pathname === "/dashboard/vanchuyen" ||
                    pathname === "/dashboard/danggiao" ||
                    pathname === "/dashboard/hoanthanh" ||
                    pathname === "/dashboard/dahuy" ||
                    pathname === "/dashboard/trahang"
                      ? "text-green-500"
                      : ""
                  }`}
                >
                  <span className="text-xl">
                    <RiProductHuntLine />
                  </span>
                  <Link
                    to="/dashboard/tatca"
                    className={`block ${
                      pathname === "/dashboard/tatca" ||
                      pathname === "/dashboard/choxuly" ||
                      pathname === "/dashboard/vanchuyen" ||
                      pathname === "/dashboard/danggiao" ||
                      pathname === "/dashboard/hoanthanh" ||
                      pathname === "/dashboard/dahuy" ||
                      pathname === "/dashboard/trahang"
                        ? "border-b-2 border-green-500"
                        : ""
                    }`}
                  >
                    Đơn Hàng của tôi
                  </Link>
                </li>
                <li
                  className={`flex justify-start items-center gap-2 py-2 ${
                    pathname === "/dashboard/my-wishlist"
                      ? "text-green-500"
                      : ""
                  }`}
                >
                  <span className="text-xl">
                    <BsHeart />
                  </span>
                  <Link
                    to="/dashboard/my-wishlist"
                    className={`block ${
                      pathname === "/dashboard/my-wishlist"
                        ? "border-b-2 border-green-500"
                        : ""
                    }`}
                  >
                    Yêu Thích
                  </Link>
                </li>
                <li
                  className={`flex justify-start items-center gap-2 py-2 ${
                    pathname === "/dashboard/chat" ? "text-green-500" : ""
                  }`}
                >
                  <span className="text-xl">
                    <BsChat />
                  </span>
                  <Link
                    to="/dashboard/chat"
                    className={`block ${
                      pathname === "/dashboard/chat"
                        ? "border-b-2 border-green-500"
                        : ""
                    }`}
                  >
                    Chat
                  </Link>
                </li>
                <li
                  className={`flex justify-start items-center gap-2 py-2 ${
                    pathname === "/dashboard/profile" ? "text-green-500" : ""
                  }`}
                >
                  <span className="text-xl">
                    <ImProfile />
                  </span>
                  <Link
                    to="/dashboard/profile"
                    className={`block ${
                      pathname === "/dashboard/profile"
                        ? "border-b-2 border-green-500"
                        : ""
                    }`}
                  >
                    Thông tin
                  </Link>
                </li>
                {userInfo.email_verified ? "" : (
                  <li
                    className={`flex justify-start items-center gap-2 py-2 ${
                      pathname === "/dashboard/change-password"
                        ? "text-green-500"
                        : ""
                    }`}
                  >
                    <span className="text-xl">
                      <TfiLock />
                    </span>
                    <Link
                      to="/dashboard/change-password"
                      className={`block ${
                        pathname === "/dashboard/change-password"
                          ? "border-b-2 border-green-500"
                          : ""
                      }`}
                    >
                      Thay đổi mật khẩu
                    </Link>
                  </li>
                )}
                <li
                  onClick={logout}
                  className="flex justify-start items-center gap-2 py-2 cursor-pointer"
                >
                  <span className="text-xl">
                    <BiLogInCircle />
                  </span>
                  <Link to="/dashboard" className="block">
                    Đăng xuất
                  </Link>
                </li>
              </ul>
            </div>
            <div className="w-[calc(100%-270px)] md-lg:w-full">
              <div className="mx-4 md-lg:mx-0">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Dashboard;
