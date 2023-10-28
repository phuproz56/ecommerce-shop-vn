/* eslint-disable jsx-a11y/role-supports-aria-props */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserInformation } from "../../store/reducers/authReducer";
import toast from "react-hot-toast";
import { messageClear } from "../../store/reducers/authReducer";

const Profile = () => {
  const { userInfo, errorMessage, successMessage } = useSelector(
    (state) => state.auth
  );
  const [name, setName] = useState(userInfo && userInfo.name);
  const [email, setEmail] = useState(userInfo && userInfo.email);
  const [phoneNumber, setPhoneNumber] = useState(
    userInfo && userInfo.phoneNumber
  );
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());

      setTimeout(function () {
        window.location.reload(1);
      }, 2500);
    }
  }, [dispatch, errorMessage, successMessage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserInformation({ name, email, phoneNumber, password }));
  };
  return (
    <div className="p-4 bg-white rounded-md">
   
      <div className="w-full px-5">
        <form onSubmit={handleSubmit} aria-required={true}>
          <div className="w-full 800px:flex block pb-3">
            <div className=" w-[100%] 800px:w-[60%]">
              <label className="block pb-2">Họ và tên (Tên người nhận)</label>
              <input
                type="text"
                className={`border p-2 rounded-[5px] !w-[95%] mb-4 800px:mb-0`}
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className=" w-[100%] 800px:w-[50%]">
              <label className="block pb-2">Email</label>
              <input
                type="text"
                className={`border p-2 rounded-[5px] !w-[95%] mb-1 800px:mb-0`}
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="w-full 800px:flex block pb-3">
            <div className=" w-[100%] 800px:w-[50%]">
              <label className="block pb-2">Số điện thoại: (+84)</label>

              <input
                type="number"
                className={`border p-2 rounded-[5px] !w-[95%] mb-4 800px:mb-0`}
                required
                placeholder="+84"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            <div className=" w-[100%] 800px:w-[50%]">
              <label className="block pb-2">
                Nhập mật khẩu để thay đổi thông tin{" "}
              </label>
              <input
                type="password"
                className={`border p-2 rounded-[5px] !w-[95%] mb-4 800px:mb-0`}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <input
            className={`w-[250px] h-[40px] border border-[#fd3e25] text-center text-[#eeeeee] font-bold rounded-[8px] mt-8 bg-[#2374e1] cursor-pointer`}
            required
            value="Cập nhật"
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};

export default Profile;
