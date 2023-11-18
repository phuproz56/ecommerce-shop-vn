/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Ratings from "../components/Ratings";
import RatingTemp from "./RatingTemp";
import Pagination from "./Pagination";
import RatingReact from "react-rating";
import { AiFillStar } from "react-icons/ai";
import { CiStar } from "react-icons/ci";
import { Link } from "react-router-dom";
import {
  customer_review,
  get_product,
  get_reviews,
  messageClear,
} from "../store/reducers/homeReducer";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

const Reviews = ({ product }) => {
  const dispatch = useDispatch();

  const [rat, setRat] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [perPage, setPerpage] = useState(10);
  const { successMessage, reviews, totalReview, rating_review } = useSelector(
    (state) => state.home
  );
  const { userInfo } = useSelector((state) => state.auth);

  const [re, setRe] = useState();

  const review_submit = (e) => {
    e.preventDefault();
    const obj = {
      name: userInfo.name,
      review: re,
      rating: rat,
      productId: product._id,
    };
    dispatch(customer_review(obj));
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(
        get_reviews({
          productId: product._id,
          pageNumber,
        })
      );
      dispatch(get_product(product.slug));
      setRat("");
      setRe("");
      dispatch(messageClear());
    }
  }, [successMessage]);

  useEffect(() => {
    if (product._id) {
      dispatch(
        get_reviews({
          productId: product._id,
          pageNumber,
        })
      );
    }
  }, [pageNumber, product]);

  return (
    <div className="mt-8">
      <div className="flex gap-10 md:flex-col">
        <div className="flex flex-col gap-2 justify-start items-start py-4">
          <div>
            <span className="text-6xl font-semibold">{product.rating}</span>
            <span className="text-3xl font-semibold text-slate-600">/5</span>
          </div>
          <div className="flex text-4xl">
            <Ratings ratings={product.rating} />
          </div>
          <p className="text-sm text-slate-600">{totalReview} Đánh Giá</p>
        </div>
        <div className="flex gap-2 flex-col py-4">
          <div className="flex justify-start items-center gap-5">
            <div className="text-md flex gap-1 w-[93px]">
              <RatingTemp rating={5} />
            </div>
            <div className="w-[200px] h-[14px] bg-slate-200 relative">
              <div
                style={{
                  width: `${Math.floor(
                    (100 * (rating_review[0]?.sum || 0)) / totalReview
                  )}%`,
                }}
                className="h-full bg-[#EDBB0E]"
              ></div>
            </div>
            <p className="text-sm text-slate-600 w-[0%]">
              {rating_review[0]?.sum}
            </p>
          </div>
          <div className="flex justify-start items-center gap-5">
            <div className="text-md flex gap-1 w-[93px]">
              <RatingTemp rating={4} />
            </div>
            <div className="w-[200px] h-[14px] bg-slate-200 relative">
              <div
                style={{
                  width: `${Math.floor(
                    (100 * (rating_review[1]?.sum || 0)) / totalReview
                  )}%`,
                }}
                className="h-full bg-[#EDBB0E] "
              ></div>
            </div>
            <p className="text-sm text-slate-600 w-[0%]">
              {rating_review[1]?.sum}
            </p>
          </div>
          <div className="flex justify-start items-center gap-5">
            <div className="text-md flex gap-1 w-[93px]">
              <RatingTemp rating={3} />
            </div>
            <div className="w-[200px] h-[14px] bg-slate-200 relative">
              <div
                style={{
                  width: `${Math.floor(
                    (100 * (rating_review[2]?.sum || 0)) / totalReview
                  )}%`,
                }}
                className="h-full bg-[#EDBB0E]"
              ></div>
            </div>
            <p className="text-sm text-slate-600 w-[0%]">
              {rating_review[2]?.sum}
            </p>
          </div>{" "}
          <div className="flex justify-start items-center gap-5">
            <div className="text-md flex gap-1 w-[93px]">
              <RatingTemp rating={2} />
            </div>
            <div className="w-[200px] h-[14px] bg-slate-200 relative">
              <div
                style={{
                  width: `${Math.floor(
                    (100 * (rating_review[3]?.sum || 0)) / totalReview
                  )}%`,
                }}
                className="h-full bg-[#EDBB0E]"
              ></div>
            </div>
            <p className="text-sm text-slate-600 w-[0%]">
              {rating_review[3]?.sum}
            </p>
          </div>{" "}
          <div className="flex justify-start items-center gap-5">
            <div className="text-md flex gap-1 w-[93px]">
              <RatingTemp rating={1} />
            </div>
            <div className="w-[200px] h-[14px] bg-slate-200 relative">
              <div
                style={{
                  width: `${Math.floor(
                    (100 * (rating_review[4]?.sum || 0)) / totalReview
                  )}%`,
                }}
                className="h-full bg-[#EDBB0E]"
              ></div>
            </div>
            <p className="text-sm text-slate-600 w-[0%]">
              {rating_review[4]?.sum}
            </p>
          </div>{" "}
          <div className="flex justify-start items-center gap-5">
            <div className="text-md flex gap-1 w-[93px]">
              <RatingTemp rating={0} />
            </div>
            <div className="w-[200px] h-[14px] bg-slate-200 relative">
              <div
                style={{
                  width: `${Math.floor(
                    (100 * (rating_review[5]?.sum || 0)) / totalReview
                  )}%`,
                }}
                className="h-full bg-[#EDBB0E]"
              ></div>
            </div>
            <p className="text-sm text-slate-600 w-[0%]">
              {rating_review[5]?.sum}
            </p>
          </div>
        </div>
      </div>
      <h2 className="text-slate-600 text-xl font-bold py-5">
        Lượt Đánh Giá Sản Phẩm: {totalReview}
      </h2>
      <div className="flex flex-col gap-8 pb-10 pt-4">
        {reviews.map((r, i) => (
          <div key={i} className="flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <div className="flex gap-1 text-xl">
                <RatingTemp rating={r.rating} />
              </div>
              <span className="text-slate-600">{r.date}</span>
            </div>
            <span className="text-slate-600 text-md">{r.name}</span>
            <p>{r.review}</p>
          </div>
        ))}
        <div className="flex justify-end">
          {totalReview > 5 && (
            <Pagination
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
              totalItem={totalReview}
              parPage={5}
              showItem={Math.round(totalReview / 5)}
            />
          )}
        </div>
      </div>
      <div>
        {userInfo ? (
          <div className="flex flex-col gap-3">
            <div className="flex gap-1">
              <RatingReact
                onChange={(e) => setRat(e)}
                initialRating={rat}
                emptySymbol={
                  <span className="text-slate-600 text-4xl">
                    <CiStar />
                  </span>
                }
                fullSymbol={
                  <span className="text-[#EDBB0E] text-4xl">
                    <AiFillStar />
                  </span>
                }
              />
            </div>
            <form onSubmit={review_submit}>
              <textarea
                value={re}
                required
                onChange={(e) => setRe(e.target.value)}
                className="border outline-0 p-3 w-full"
                name=""
                id=""
                cols="30"
                rows="5"
              ></textarea>
              <div>
                <button className="py-1 px-5 bg-indigo-500 text-white rounded-sm">
                  Đánh giá
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div>
            <Link
              to="/login"
              className="py-1 px-5 bg-indigo-500 text-white rounded-sm"
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reviews;
