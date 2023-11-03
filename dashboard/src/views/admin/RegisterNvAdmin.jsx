/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { PropagateLoader } from "react-spinners";
import { overrideStyle } from "../../utils/utils";
import {
  messageClear,
  nvadmin_register,
} from "../../store/Reducers/authReducer";
import toast from "react-hot-toast";
const RegisterNvAdmin = () => {
  const dispatch = useDispatch();
  const { loader, errorMessage, successMessage } = useSelector(
    (state) => state.auth
  );
  const [state, setSatate] = useState({
    name: "",
    email: "",
    password: "",
  });
  const inputHandle = (e) => {
    setSatate({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const submit = (e) => {
    e.preventDefault();
    dispatch(nvadmin_register(state));
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
  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4  bg-[#283046] rounded-md text-white">
      <h2 className="text-center">Đăng Ký Tài Khoản Nhân Viên</h2>
        <form onSubmit={submit}>
          <div className="flex flex-col w-full gap-1 mb-3 ">
            <label className="flex" htmlFor="name">Tên <p className="text-red-500">*</p></label>
            <input
              onChange={inputHandle}
              value={state.name}
              className="px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md text-[#d0d2d6] focus:border-indigo-500 overflow-hidden"
              type="text"
              name="name"
              placeholder="name"
              id="name"
              required
            />
          </div>
          <div className="flex flex-col w-full gap-1 mb-3">
            <label className="flex" htmlFor="email">Email  <p className="text-red-500">*</p></label>
            <input
              onChange={inputHandle}
              value={state.email}
              className="px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md text-[#d0d2d6] focus:border-indigo-500 overflow-hidden"
              type="email"
              name="email"
              placeholder="email"
              id="email"
              required
            />
          </div>
          <div className="flex flex-col w-full gap-1 mb-3">
            <label className="flex" htmlFor="password">Mật khẩu  <p className="text-red-500">*</p></label>
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
              "Đăng Ký"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterNvAdmin;
