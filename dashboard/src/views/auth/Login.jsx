/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import { overrideStyle } from "../../utils/utils";
import { messageClear, seller_login } from "../../store/Reducers/authReducer";
import toast from "react-hot-toast";
function Login() {
  const [open, setOpen] = useState();
  const navigate = useNavigate();
  const [state, setSatate] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const { loader, errorMessage, successMessage } = useSelector(
    (state) => state.auth
  );
  const inputHandle = (e) => {
    setSatate({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const submit = (e) => {
    e.preventDefault();
    dispatch(seller_login(state));
  };
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      navigate("/");
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setOpen(true);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="min-w-screen min-h-screen bg-[#161d31] flex justify-center items-center">
      {open && (
        <div className="fixed transition-all duration-500 ease-in-out top-0 left-0 w-full h-screen bg-[#0000004b] flex items-center justify-center">
          <div className="p-4 w-[600px] h-[250px] bg-white rounded shadow relative">
            <div className="w-full flex justify-end p-3"></div>
            <h1 className="text-center text-[25px] font-Poppins">
              Đăng nhập với tư cách?
            </h1>
            <div className=" flex flex-row justify-between items-center pt-[50px]">
              <div className="p-3 rounded-md border cursor-pointer border-cyan-500 hover:bg-green-400 hover:shadow-xl">
                <Link to="/nhanvien-admin/login" className="">
                  Nhân Viên
                </Link>
              </div>
              <div className="p-3 rounded-md border cursor-pointer border-cyan-500 hover:bg-yellow-300">
                <Link to="/shipper/login">Shipper</Link>
              </div>
              <div className="p-3 rounded-md border cursor-pointer border-cyan-500 hover:bg-red-400">
                <Link to="/admin/login">Quản lý</Link>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="w-[350px] text-[#d0d2d6] p-2">
        <div className="bg-[#283046] p-4 rounded-md">
          <h2 className="text-xl mb-3">CHÀO MỪNG ĐẾN VỚI SHOP-VN</h2>
          <p className="mb-3 items-center justify-center text-center uppercase text-lg"></p>
          <form onSubmit={submit}>
            <div className="flex flex-col w-full gap-1 mb-3">
              <label htmlFor="email">Email</label>
              <input
                onChange={inputHandle}
                value={state.email}
                className="px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md text-[#d0d2d6] focus:border-indigo-500 overflow-hidden"
                type="text"
                name="email"
                placeholder="email"
                id="email"
                required
              />
            </div>
            <div className="flex flex-col w-full gap-1 mb-5">
              <label htmlFor="password">Password</label>
              <input
                onChange={inputHandle}
                value={state.password}
                className="px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md text-[#d0d2d6] focus:border-indigo-500 overflow-hidden"
                type="password"
                name="password"
                placeholder="password"
                id="password"
                required
              />
            </div>
            <button
              disabled={loader ? true : false}
              className="bg-blue-500 w-full hover:shadow-blue-500/20 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3"
            >
              {loader ? (
                <PropagateLoader color="#fff" cssOverride={overrideStyle} />
              ) : (
                "Đăng Nhập"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
