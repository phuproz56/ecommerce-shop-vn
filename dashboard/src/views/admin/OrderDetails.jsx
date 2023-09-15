import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const OrderDetails = () => {

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4  bg-[#283046] rounded-md">
        <div className="flex justify-between items-center p-4">
          <h2 className="text-xl text-[#d0d2d6]">Order Details</h2>
          <select
           
            
            name=""
            id=""
            className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
          >
            <option value="pending">pending</option>
            <option value="processing">processing</option>
            <option value="warehouse">warehouse</option>
            <option value="placed">placed</option>
            <option value="cancelled">cancelled</option>
          </select>
        </div>
        <div className="p-4">
          <div className="flex gap-2 text-lg text-[#d0d2d6]">
            <h2>123</h2>
            <span>123</span>
          </div>
          <div className="flex flex-wrap">
            <div className="w-[32%]">
              <div className="pr-3 text-[#d0d2d6] text-lg">
                <div className="flex flex-col gap-1">
                  <h2 className="pb-2 font-semibold">
                    Deliver to : 123
                  </h2>
                  <p>
                    <span className="text-sm">
                     123{" "}
                      123 123{" "}
                      123
                    </span>
                  </p>
                </div>
                <div className="flex justify-start items-center gap-3">
                  <h2>Payment Status : </h2>
                  <span className="text-base">123</span>
                </div>
                <span>Price : $123</span>
                <div className="mt-4 flex flex-col gap-8">
                  <div className="text-[#d0d2d6]">
                    {123 &&
                      [1, 2, 3, 4, 5].map((p, i) => (
                        <div key={i} className="flex gap-3 text-md">
                          <img
                            className="w-[45px] h-[45px]"
                            // src={p.images[0]}
                            alt=""
                          />
                          <div>
                            <h2>123</h2>
                            <p>
                              <span>Brand : </span>
                              <span>{p.brand} </span>
                              <span className="text-lg">
                                Quantity : 123
                              </span>
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[68%]">
              <div className="pl-3">
                <div className="mt-4 flex flex-col">
                  {[1, 2, 3, 4, 5].map((o, i) => (
                    <div key={i + 20} className="text-[#d0d2d6] mb-6">
                      <div className="flex justify-start items-center gap-3">
                        <h2>Seller {i + 1} order : </h2>
                        <span>123</span>
                      </div>
                      {[1, 2, 3, 4, 5].map((p, i) => (
                        <div className="flex gap-3 text-md mt-2">
                          <img
                            className="w-[45px] h-[45px]"
                            // src={p.images[0]}
                            alt=""
                          />
                          <div>
                            <h2>{p.name}</h2>
                            <p>
                              <span>Brand : </span>
                              <span>123 </span>
                              <span className="text-lg">
                                Quantity : 123
                              </span>
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
