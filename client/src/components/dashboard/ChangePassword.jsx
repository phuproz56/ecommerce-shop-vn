import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  change_password,
  messageClear,
} from "../../store/reducers/authReducer";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { user_reset } from "../../store/reducers/authReducer";
import { reset_count } from "../../store/reducers/cardReducer";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { successMessage, errorMessage } = useSelector((state) => state.auth);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const passwordChangeHandler = (e) => {
    e.preventDefault();
    const data = {
      oldPassword: oldPassword,
      newPassword: newPassword,
    };
    dispatch(change_password(data));
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      localStorage.removeItem("customerToken");
      dispatch(user_reset());
      dispatch(reset_count());
      setTimeout(() => {
        navigate('/login')
      }, 2000)
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage, dispatch, navigate]);

  return (
    <div className="p-4 bg-white">
      <h2 className="text-xl text-slate-600 pb-5">Thay Đổi Mật Khẩu</h2>
      <form onSubmit={passwordChangeHandler}>
        <div className="flex flex-col gap-1 mb-2">
          <label htmlFor="old_password">Mật Khẩu Cũ</label>
          <input
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            type="password"
            id="oldPassword"
            name="oldPassword"
            placeholder="old password"
            className="outline-none px-3 py-1 border rounded-md text-slate-600"
          />
        </div>
        <div className="flex flex-col gap-1 mb-2">
          <label htmlFor="new_password">Mật Khẩu Mới</label>
          <input
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            type="password"
            id="newPassword"
            name="newPassword"
            placeholder="new password"
            className="outline-none px-3 py-1 border rounded-md text-slate-600"
          />
        </div>
        <div>
          <button className="px-8 py-2 bg-purple-500 shadow-lg hover:shadow-purple-500/30 text-white rounded-md">
            Cập Nhật
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
