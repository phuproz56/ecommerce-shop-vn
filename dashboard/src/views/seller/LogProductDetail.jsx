import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { PropagateLoader } from "react-spinners";
import toast from "react-hot-toast";
import { get_category } from "../../store/Reducers/categoryReducer";
import {
  get_product,
  messageClear,
  update_product,
} from "../../store/Reducers/productReducer";
import { overrideStyle } from "../../utils/utils";
import moment from "moment";
const LogProductDetail = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const {
    product,
    loader,
    errorMessage,
    successMessage,
    warehouse,
    updateDate,
  } = useSelector((state) => state.product);
  useEffect(() => {
    dispatch(
      get_category({
        searchValue: "",
        parPage: "",
        page: "",
      })
    );
  }, [dispatch]);
  const [state, setState] = useState({
    price: product.price || "",
    stock: product.stock || "",
  });
  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    dispatch(get_product(productId));
  }, [dispatch, productId]);

  useEffect(() => {
    setState({
      price: product.price,
      stock: product.stock,
    });
  }, [product]);

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage, dispatch]);

  const update = (e) => {
    e.preventDefault();
    const obj = {
      price: state.price,
      stock: state.stock,
      productId: productId,
    };
    dispatch(update_product(obj));
  };
  const date = moment(updateDate).format('LL');
  console.log(date);

  return (
    <div className="px-2 lg:px-7 pt-5 ">
      <div className="w-full p-4  bg-[#283046] rounded-md">
        <div className="flex justify-between items-center pb-4">
          <h1 className="text-[#d0d2d6] text-xl font-semibold">Warehouse</h1>
        </div>
        <div>
          <form onSubmit={update}>
            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]">
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="price">Price</label>
                <input
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                  onChange={inputHandle}
                  value={state.price}
                  type="number"
                  placeholder="price"
                  name="price"
                  id="price"
                />
              </div>
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="stock">Stock</label>
                <input
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                  onChange={inputHandle}
                  value={state.warehouse}
                  type="number"
                  min="0"
                  placeholder="Add to stock"
                  name="stock"
                  id="stock"
                />
              </div>
            </div>
            <div className="flex">
              <button
                disabled={loader ? true : false}
                className="bg-blue-500 w-[190px] hover:shadow-blue-500/20 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3"
              >
                {loader ? (
                  <PropagateLoader color="#fff" cssOverride={overrideStyle} />
                ) : (
                  "Update product"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogProductDetail;
