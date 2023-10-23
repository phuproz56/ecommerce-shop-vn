/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { GrMail } from "react-icons/gr";
import { IoIosCall } from "react-icons/io";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaUser,
  FaLock,
  FaList,
} from "react-icons/fa";
import { BiMicrophone } from "react-icons/bi";
import {
  AiOutlineTwitter,
  AiFillGithub,
  AiFillHeart,
  AiFillShopping,
} from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  get_card_products,
  get_wishlist_products,
} from "../store/reducers/cardReducer";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const Headers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const { categorys } = useSelector((state) => state.home);
  const [categoryShow, setCategoryShow] = useState(true);
  const { pathname } = useLocation();
  const [showSlidebar, setshowSlidebar] = useState(true);
  const { card_product_count, wishlist_count } = useSelector(
    (state) => state.card
  );
  const user = 0;

  const [searchValue, setSearchValue] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (userInfo) {
      dispatch(get_card_products(userInfo.id));
      dispatch(get_wishlist_products(userInfo.id));
    }
  }, [dispatch, userInfo]);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    if (listening) {
      setSearchValue(transcript);
    }
  }, [listening, transcript]);

  const search = () => {
    navigate(`/product/search?category=${category}&&value=${searchValue}`);
  };

  console.log(searchValue);
  return (
    <div className="w-full bg-white">
      <div className="header-top bg-[#eeeeee] md-lg:hidden">
        <div className="w-[85%] lg:w-[90%] mx-auto">
          <div className="flex w-full justify-between items-center h-[50px] text-slate-500">
            <ul className="flex justify-start items-center gap-8">
              <li
                className="flex relative justify-center items-center gap-2 text-sm
              after:absolute after:h-[18px] after:w-[1px] after:bg-[#afafaf] after:-right-[16px]"
              >
                <p>
                  Bạn muốn bán hàng?{" "}
                  <Link
                    className="text-blue-500"
                    target="_blank"
                    to="http://localhost:3001/login"
                  >
                    Kênh Người Bán
                  </Link>
                </p>
              </li>
              <li
                className="flex relative justify-center items-center gap-2 text-sm
              after:absolute after:h-[18px] after:w-[1px] after:bg-[#afafaf] after:-right-[16px]"
              >
                <span>
                  <GrMail />
                </span>
                <span>phuproz348@gmail.com</span>
              </li>

              <span>Chào mừng đến với Shop-VN</span>
            </ul>
            <div>
              <div className="flex justify-center items-center gap-10">
                <div className="flex justify-center items-center gap-4 ">
                  <a href="#" className="hover:text-green-500">
                    <FaFacebookF />
                  </a>
                  <a href="#" className="hover:text-green-500">
                    <AiOutlineTwitter />
                  </a>
                  <a href="#" className="hover:text-green-500">
                    <FaLinkedinIn />
                  </a>
                  <a href="#" className="hover:text-green-500">
                    <AiFillGithub />
                  </a>
                </div>
                <div
                  className="flex group cursor-pointer text-slate-800 text-sm
                justify-center items-center gap-1 relative after:h-[18px] after:w-[1px] after:bg-[#afafaf] after:-right-[16px]
                after:absolute before:absolute before:h-[18px] before:bg-[#afafaf] before:w-[1px] before:-left-[20px]"
                >
                  <img src="/images/vietnam.png" alt="" />
                  <span>
                    <MdOutlineKeyboardArrowDown />
                  </span>
                  <ul className="absolute invisible transition-all-to-12 rounded-sm duration-200 text-white p-2 w-[100px] flex flex-col gap-3 group-hover:visible group-hover:top-6 group-hover:bg-black z-10">
                    <li>Vietnamese</li>
                    <li>English</li>
                  </ul>
                </div>
                {userInfo ? (
                  <Link
                    className="flex cursor-pointer justify-center items-center gap-2 text-sm"
                    to="/dashboard"
                  >
                    <span>
                      <FaUser />
                    </span>
                    <span>{userInfo.name}</span>
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className="flex cursor-pointer justify-center items-center gap-2 text-sm"
                  >
                    <span>
                      <FaLock />
                    </span>
                    <span>Đăng nhập</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-white">
        <div className="w-[85%] lg:w-[90%] mx-auto">
          <div
            className="h-[80px] md-lg:h-[100px] flex justify-between
            items-center flex-wrap"
          >
            <div className="md-lg:w-full w-3/12 md-lg:pt-4">
              <div className="flex justify-between items-center">
                <Link to="/">
                  <img src="/images/vnshop.jpg" alt="logo" />
                </Link>
                <div
                  className=" justify-center items-center w-[30px] h-[30px] bg-white text-slate-600 border border-slate-600 rounded-sm cursor-pointer lg:hidden md-lg:flex xl:hidden hidden"
                  onClick={() => setshowSlidebar(false)}
                >
                  <span>
                    <FaList />
                  </span>
                </div>
              </div>
            </div>
            <div className="md-lg:w-full w-9/12">
              <div className="flex justify-between md-lg:justify-center items-center flex-wrap pl-8">
                <ul className="flex justify-start items-start gap-8 text-sm font-bold uppercase md-lg:hidden">
                  <li>
                    <Link
                      to="/"
                      className={`p-2 block ${
                        pathname === "/" ? "text-[#7fad39]" : "text-slate-600"
                      }`}
                    >
                      Trang Chủ
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/shops"
                      className={`p-2 block ${
                        pathname === "/shops"
                          ? "text-[#7fad39]"
                          : "text-slate-600"
                      }`}
                    >
                      Cửa Hàng
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/event"
                      className={`p-2 block ${
                        pathname === "/shops"
                          ? "text-[#7fad39]"
                          : "text-slate-600"
                      }`}
                    >
                      Sự Kiện Khuyến Mãi
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`p-2 block ${
                        pathname === "/about"
                          ? "text-[#7fad39]"
                          : "text-slate-600"
                      }`}
                    >
                      Về Chúng tôi
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`p-2 block ${
                        pathname === "/contact"
                          ? "text-[#7fad39]"
                          : "text-slate-600"
                      }`}
                    >
                      liên hệ
                    </Link>
                  </li>
                </ul>
                <div className="flex md-lg:hidden justify-center items-center gap-5">
                  <div className="flex justify-center gap-5">
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden md-lg:block">
        <div
          onClick={() => setshowSlidebar(true)}
          className={`fixed duration-200 transition-all ${
            showSlidebar ? "invisible" : "visible"
          } hidden md-lg:block w-screen h-screen bg-[rgba(0,0,0,0.5)] top-0 left-0 z-20`}
        ></div>
        <div
          className={`w-[300px] z-[9999] transition-all duration-200 fixed ${
            showSlidebar ? "-left-[300px]" : "left-0 "
          } top-0 overflow-y-auto bg-white h-screen py-6 px-8`}
        >
          <div className="flex justify-start flex-col gap-6">
            <Link to="/">
              <img src="/images/vnshop.jpg" alt="logo" />
            </Link>
            <div className="flex justify-start items-center gap-10">
              <div
                className="flex group cursor-pointer text-slate-800 text-sm
                justify-center items-center gap-1 relative after:h-[18px] after:w-[1px] after:bg-[#afafaf] after:-right-[16px]
                after:absolute before:absolute"
              >
                <img src="/images/language.png" alt="" />
                <span>
                  <MdOutlineKeyboardArrowDown />
                </span>
                <ul className="absolute invisible transition-all-to-12 rounded-sm duration-200 text-white p-2 w-[100px] flex flex-col gap-3 group-hover:visible group-hover:top-6 group-hover:bg-black z-10">
                  <li>VietNam</li>
                  <li>English</li>
                </ul>
              </div>
              {userInfo ? (
                <Link
                  className="flex cursor-pointer justify-center items-center gap-2 text-sm"
                  to="/dashboard"
                >
                  <span>
                    <FaUser />
                  </span>
                  <span>{userInfo.name}</span>
                </Link>
              ) : (
                <div className="flex cursor-pointer justify-center items-center gap-2 text-sm">
                  <span>
                    <FaLock />
                  </span>
                  <span>Đăng Nhập</span>
                </div>
              )}
            </div>{" "}
            <ul className="flex flex-col justify-start items-start text-md font-semibold uppercase">
              <li>
                <Link
                  className={`py-2 block ${
                    pathname === "/" ? "text-[#7fad39]" : "text-slate-600"
                  }`}
                >
                  Trang Chủ
                </Link>
              </li>
              <li>
                <Link
                  className={`py-2 block ${
                    pathname === "/shop" ? "text-[#7fad39]" : "text-slate-600"
                  }`}
                >
                  Cửa Hàng
                </Link>
              </li>
              <li>
                <Link
                  to="/shops"
                  className={`p-2 block ${
                    pathname === "/event" ? "text-[#7fad39]" : "text-slate-600"
                  }`}
                >
                  Sự Kiện Khuyến Mãi
                </Link>
              </li>
              <li>
                <Link
                  className={`py-2 block ${
                    pathname === "/about" ? "text-[#7fad39]" : "text-slate-600"
                  }`}
                >
                  Về Chúng tôi
                </Link>
              </li>
              <li>
                <Link
                  className={`py-2 block ${
                    pathname === "/contact"
                      ? "text-[#7fad39]"
                      : "text-slate-600"
                  }`}
                >
                  liên hệ
                </Link>
              </li>
            </ul>
            <div className="flex justify-start items-center gap-4">
              <a href="#">
                <FaFacebookF />
              </a>
              <a href="#">
                <AiOutlineTwitter />
              </a>
              <a href="#">
                <FaLinkedinIn />
              </a>
              <a href="#">
                <AiFillGithub />
              </a>
            </div>
            <div className="w-full flex justify-end md-lg:justify-start gap-3 items-center">
              <div className="w-[48px] h-[48px] rounded-full flex bg-[#f5f5f5] justify-center items-center">
                <span>
                  <IoIosCall />
                </span>
              </div>
              <div className="flex justify-end flex-col gap-1">
                <h2 className="text-sm font-medium text-slate-700">
                  +1234567890
                </h2>
                <span className="text-xs">hỗ trợ 24/7 time</span>
              </div>
            </div>
            <ul className="flex flex-col justify-start items-start gap-3 text-[#1c1c1c]">
              <li className="flex justify-start items-center gap-2 text-sm">
                <span>
                  <GrMail />
                </span>
                <span>support.shopvn@gmail.com</span>
              </li>
              <span className="text-sm">Shop-VN</span>
            </ul>
          </div>
        </div>
      </div>
      <div className="w-[85%] lg:w-[90%] mx-auto">
        <div className="flex w-full flex-wrap md-lg:gap-8">
          <div className="w-3/12 md-lg:w-full">
            <div className="bg-white relative">
              <div
                onClick={() => setCategoryShow(!categoryShow)}
                className="h-[50px] bg-red-300 text-white flex justify-center md-lg:justify-between md-lg:px-6 items-center gap-3 font-bold text-md cursor-pointer"
              >
                <div className="flex justify-center items-center gap-3">
                  <span>
                    <FaList />
                  </span>
                  <span>DANH MỤC SẢN PHẨM</span>
                </div>
                <span className="pt-1">
                  <MdOutlineKeyboardArrowDown />
                </span>
              </div>
              <div
                className={`${
                  categoryShow ? "h-0" : "h-[400px]"
                } overflow-hidden transition-all md-lg:relative duration-500 absolute z-[99999] bg-white w-full border-x`}
              >
                <ul className="py-2 text-slate-600 font-medium h-full overflow-auto">
                  {categorys.map((c, i) => {
                    return (
                      <li
                        key={i}
                        className="flex justify-start items-center gap-2 px-[24px] py-[6px]"
                      >
                        <img
                          className="w-[30px] h-[30px] rounded-full overflow-hidden"
                          src={c.image}
                          alt={c.name}
                        />
                        <Link
                          to={`/product/?category=${c.name}`}
                          className="text-sm block"
                        >
                          {c.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
          <div className="w-8/12 pl-8 md-lg:pl-0 md-lg:w-full">
            <div className="flex flex-wrap w-full justify-start items-start">
              <div className="w-8/12 md-lg:w-9/12">
                <div className="flex border h-[50px] items-center relative gap-5">
                  <div className="relative after:absolute w-6/12 after:h-[25px] after:w-[1px] after:bg-[#afafaf] after:-right-[15px] md:hidden">
                    <select
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full text-slate-600 font-semibold bg-transparent px-2 h-full outline-0 border-none"
                      name=""
                      id=""
                    >
                      <option value="">Chọn Danh Mục</option>
                      {categorys.map((c, i) => (
                        <option key={i} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {listening ? (
                    <div className="flex w-full pr-[20px]">
                      <input
                        className="w-full bg-transparent text-slate-500 outline-0 px-3 h-full"
                        value={transcript}
                        type="text"
                        placeholder="Bạn đang tìm gì ?"
                      />
                      <div className="flex items-end h-full">
                        <p
                          className="flex text-lg cursor-pointer "
                          onClick={SpeechRecognition.startListening}
                        >
                          <BiMicrophone />
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex w-full pr-[20px]">
                      <input
                        className="w-full bg-transparent text-slate-500 outline-0 px-3 h-full"
                        onChange={(e) => setSearchValue(e.target.value)}
                        type="text"
                        placeholder="Bạn đang tìm gì ?"
                      />
                      <div className="flex items-end h-full">
                        <p
                          className="flex text-lg cursor-pointer "
                          onClick={SpeechRecognition.startListening}
                        >
                          <BiMicrophone />
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex relative border h-[50px] items-center w-1/12 md-lg:w-3/12">
                <button
                  onClick={search}
                  className="bg-red-300 right-0 px-8 h-full font-semibold uppercase text-white"
                >
                  TÌM KIẾM
                </button>
              </div>
              {/* <div className="w-2/12 block md-lg:hidden pl-2 md-lg:w-full md-lg:pl-0">
                <div className="w-full flex justify-end md-lg:justify-start gap-3 items-center">
                  <div className="w-[48px] h-[48px] rounded-full flex bg-[#f5f5f5] justify-center items-center">
                    <span>
                      <IoIosCall />
                    </span>
                  </div>
                  <div className="flex justify-end flex-col gap-1">
                    <h2 className="text-sm font-medium text-slate-700">
                      +1234567890
                    </h2>
                    <span className="text-xs">support 24/7 time</span>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Headers;
