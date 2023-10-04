import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
const index = () => {
  return (
    <div>
      <div className="grid grid-cols-3 md:grid-cols-1 gap-5">
        <div className="flex justify-center items-center p-5 bg-white rounded-md gap-5">
          <div className="bg-green-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl">
            <span className="text-xl text-green-800">
              <AiOutlineShoppingCart />
            </span>
          </div>
          <div className="flex flex-col justify-start items-start text-slate-600">
            <h2 className="text-3xl font-bold">20</h2>
            <span>Orders</span>
          </div>
        </div>
        <div className="flex justify-center items-center p-5 bg-white rounded-md gap-5">
          <div className="bg-blue-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl">
            <span className="text-xl text-blue-800">
              <AiOutlineShoppingCart />
            </span>
          </div>
          <div className="flex flex-col justify-start items-start text-slate-600">
            <h2 className="text-3xl font-bold">10</h2>
            <span>Pending Orders</span>
          </div>
        </div>
        <div className="flex justify-center items-center p-5 bg-white rounded-md gap-5">
          <div className="bg-red-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl">
            <span className="text-xl text-red-800">
              <AiOutlineShoppingCart />
            </span>
          </div>
          <div className="flex flex-col justify-start items-start text-slate-600">
            <h2 className="text-3xl font-bold">5</h2>
            <span>Cancelled Orders</span>
          </div>
        </div>
      </div>
      <div className="bg-white p-5 mt-5 rounded-md">
        <h2 className="text-lg font-semibold text-slate-600">Recent Orders</h2>
        <div className="pt-4 ">
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-6 py-3" scope="col">
                    Order Id
                  </th>
                  <th className="px-6 py-3" scope="col">
                    Price
                  </th>
                  <th className="px-6 py-3" scope="col">
                    Payment status
                  </th>
                  <th className="px-6 py-3" scope="col">
                    Order status
                  </th>
                  <th className="px-6 py-3" scope="col">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap"
                  >
                    1231412
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap"
                  >
                    $123
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap"
                  >
                    pending
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap"
                  >
                    pending
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap"
                  >
                    <Link to={`/dashboard/order/details/4312312`}>
                      <span className="bg-green-100 text-green-800 text-sm font-normal mr-2 px-2.5 py-[1px] rounded">
                        View
                      </span>
                    </Link>
                    <span className="bg-green-100 text-green-800 text-sm font-normal mr-2 px-2.5 py-[1px] rounded cursor-pointer">
                      Pay Now
                    </span>
                  </th>
                </tr>
                <tr className="bg-white border-b">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap"
                  >
                    1231412
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap"
                  >
                    $123
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap"
                  >
                    pending
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap"
                  >
                    pending
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap"
                  >
                    <Link to={`/dashboard/order/details/4312312`}>
                      <span className="bg-green-100 text-green-800 text-sm font-normal mr-2 px-2.5 py-[1px] rounded">
                        View
                      </span>
                    </Link>
                    <span className="bg-green-100 text-green-800 text-sm font-normal mr-2 px-2.5 py-[1px] rounded cursor-pointer">
                      Pay Now
                    </span>
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
