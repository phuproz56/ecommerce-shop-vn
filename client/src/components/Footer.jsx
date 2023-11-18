/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebookF, FaLinkedin } from "react-icons/fa";
import {
  AiFillGithub,
  AiFillHeart,
  AiFillShopping,
  AiOutlineTwitter,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  get_card_products,
  get_wishlist_products,
} from "../store/reducers/cardReducer";
const Footer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const { card_product_count, wishlist_count } = useSelector(
    (state) => state.card
  );
  useEffect(() => {
    if (userInfo) {
      dispatch(get_card_products(userInfo.id));
      dispatch(get_wishlist_products(userInfo.id));
    }
  }, [dispatch, userInfo]);
  return (
    <footer className="bg-[#F3F6Fa]">
      <div className="w-[85%] flex flex-wrap mx-auto border-b py-16 md-lg:pb-10 sm:pb-6">
        <div className="w-3/12 lg:w-4/12 sm:w-full">
          <div className="flex flex-col gap-3">
            <img
              className="w-[190px] h-[70x]"
              src="/images/shopvn.png"
              alt="logo"
            />
            <ul className="flex flex-col gap-2 text-slate-600">
              <li>Địa Chỉ : Can Tho</li>
              <li>SĐT : (+84) 123456789</li>
              <li>Email : phuproz348@gmail.com</li>
            </ul>
          </div>
        </div>
        <div className="w-5/12 lg:w-8/12 sm:w-full">
          <div className="flex justify-center sm:justify-start sm:mt-6 w-full">
            <div>
              <h2 className="font-bold text-lg mb-2">Liên kết hữu ích</h2>
              <div className="flex justify-between gap-[80px] lg:gap-[40px]">
                <ul className="flex flex-col gap-2 text-slate-600 text-sm">
                  <li>
                    <Link>Về Chúng Tôi</Link>
                  </li>
                  <li>
                    <Link>Về Cửa Hàng</Link>
                  </li>
                  <li>
                    <Link>Thông Tin Giao Hàng</Link>
                  </li>
                  <li>
                    <Link>Chính Sách Bảo Mật</Link>
                  </li>
                </ul>
                <ul className="flex flex-col gap-2 text-slate-600 text-sm">
                  <li>
                    <Link>Về Chúng Tôi</Link>
                  </li>
                  <li>
                    <Link>Về Cửa Hàng</Link>
                  </li>
                  <li>
                    <Link>Thông Tin Giao Hàng</Link>
                  </li>
                  <li>
                    <Link>Chính Sách Bảo Mật</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="w-4/12 lg:w-full lg:mt-6">
          <div className="w-full flex flex-col justify-start gap-5">
            <h2 className="font-bold text-lg mb-2">Tham Gia Với Chúng Tôi</h2>
            <span>
              Nhận thông tin cập nhật qua Email về các ưu đãi đặc biệt và mới
              nhất của cửa hàng chúng tôi
            </span>
            <div className="h-[50px] w-full bg-white border relative">
              <input
                placeholder="Enter your mail"
                className="h-full bg-transparent w-full px-3 outline-0"
                type="text"
              />
              <button className="h-full absolute right-0 bg-indigo-500 text-white uppercase px-4 font-bold text-sm">
                đăng ký
              </button>
            </div>
            <ul className="flex justify-start items-center gap-3">
              <li>
                <a
                  className="w-[38px] h-[38px] hover:bg-[#7fad39] hover:text-white flex justify-center items-center bg-white rounded-full"
                  href="#"
                >
                  <FaFacebookF />
                </a>
              </li>
              <li>
                <a
                  className="w-[38px] h-[38px] hover:bg-[#7fad39] hover:text-white flex justify-center items-center bg-white rounded-full"
                  href="#"
                >
                  <AiOutlineTwitter />
                </a>
              </li>
              <li>
                <a
                  className="w-[38px] h-[38px] hover:bg-[#7fad39] hover:text-white flex justify-center items-center bg-white rounded-full"
                  href="#"
                >
                  <FaLinkedin />
                </a>
              </li>
              <li>
                <a
                  className="w-[38px] h-[38px] hover:bg-[#7fad39] hover:text-white flex justify-center items-center bg-white rounded-full"
                  href="#"
                >
                  <AiFillGithub />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="w-[85%] flex flex-wrap justify-center items-center text-slate-600 mx-auto py-5 text-center">
        <span>
          Copyright ©2023 All rights reserved | made by{" "}
          <a className="text-blue-500 underline" href="">
            @Phu
          </a>
        </span>
      </div>
      <div className="hidden fixed md-lg:block w-[50px] bottom-14 h-[110px] right-2 bg-white rounded-full p-2">
        <div className="w-full h-full flex gap-2 flex-col justify-center items-center">
          <div
            onClick={() => navigate(userInfo ? "/cart" : "/login")}
            className="relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] rounded-full bg-[#e2e2e2]"
          >
            <span className="text-xl text-orange-500">
              <AiFillShopping />
            </span>
            {card_product_count !== 0 && (
              <div className="w-[20px] h-[20px] absolute bg-green-500 rounded-full text-white flex justify-center items-center -top-[3px] -right-[5px] text-[12px]">
                {card_product_count}
              </div>
            )}
          </div>
          <div
            onClick={() =>
              navigate(userInfo ? "/dashboard/my-wishlist" : "/login")
            }
            className="relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] rounded-full bg-[#e2e2e2]"
          >
            <Link to="/dashboard/my-wishlist">
              <span className="text-xl text-red-500">
                <AiFillHeart />
              </span>
            </Link>
            {wishlist_count !== 0 && (
              <div className="w-[20px] h-[20px] absolute bg-green-500 rounded-full text-white flex justify-center items-center -top-[3px] -right-[5px]">
                {wishlist_count}
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
