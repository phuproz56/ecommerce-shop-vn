import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  get_logproduct,
  get_product,
} from "../../store/Reducers/productReducer";
import { useParams } from "react-router-dom";

const LogProductSeeDetail = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { logProduct } = useSelector((state) => state.product);
  console.log(logProduct);

  useEffect(() => {
    dispatch(get_product(productId));
    dispatch(get_logproduct(productId));
  }, [dispatch, productId]);
  return (
    <div className="px-2 lg:px-7 pt-5 ">
      <div className="w-full p-4  bg-[#283046] rounded-md ">
        <div className="flex justify-between items-center pb-4">
          <h1 className="text-[#d0d2d6] font-semibold text-2xl">
            Chi tiết phiếu nhập hàng
          </h1>
        </div>
        {logProduct.length ? (
          logProduct.map((u, i) => (
            <div key={i} className="flex flex-col w-full gap-1">
              <div className="text-white">-------------------------</div>
              <div className="text-white">
                <p>id phiếu: {u._id}</p>
              </div>
              <div className="text-white">
                <p>Tên người lập phiếu: {u.fullname}</p>
              </div>
              <div className="text-white">
                <p>số lượng khi nhập: {u.stock}</p>
              </div>
              <div className="text-white">
                <p>giá: {u.price}</p>
              </div>
              <div className="text-white">
                <p>ghi chú: {u.note}</p>
              </div>
              <div className="text-white">
                <p>ngày lập: {u.date}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-between items-center text-2xl text-red-500">
            <p>Chưa có ai lập phiếu! </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LogProductSeeDetail;
