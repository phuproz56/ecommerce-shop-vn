/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/scope */
import React, { useEffect } from "react";
import { BsCurrencyDollar } from "react-icons/bs";
import { RiProductHuntLine } from "react-icons/ri";
import { Link, useParams } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Chart from "react-apexcharts";
import customer from "../../assets/seller.png";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import {
  get_shipper_new_order,
  thongke,
} from "../../store/Reducers/dashboardIndexReducer";
import { FaEye } from "react-icons/fa";
const ShipperDashboard = () => {
  const { orders, Total_VanChuyen, Total_Orders } = useSelector((state) => state.dashboardIndex);

  const state = {
    series: [
      {
        name: "Orders",
        data: [34, 65, 34, 65, 34, 34, 34, 56, 23, 67, 23, 45],
      },
      {
        name: "Revenue",
        data: [34, 32, 45, 32, 34, 34, 43, 56, 65, 67, 45, 78],
      },
      {
        name: "Seles",
        data: [78, 32, 34, 54, 65, 34, 54, 21, 54, 43, 45, 43],
      },
    ],
    options: {
      color: ["#181ee8", "#181ee8"],
      plotOptions: {
        radius: 30,
      },
      chart: {
        background: "transparent",
        foreColor: "#d0d2d6",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        curve: ["smooth", "straight", "stepline"],
        lineCap: "butt",
        colors: "#f0f0f0",
        width: 0.5,
        dashArray: 0,
      },
      xaxis: {
        categories: [
          "T1",
          "T2",
          "T3",
          "T4",
          "T5",
          "T6",
          "T7",
          "T8",
          "T9",
          "T10",
          "T11",
          "T12",
        ],
      },
      legend: {
        position: "top",
      },
      responsive: [
        {
          breakpoint: 565,
          yaxis: {
            categories: [
              "T1",
              "T2",
              "T3",
              "T4",
              "T5",
              "T6",
              "T7",
              "T8",
              "T9",
              "T10",
              "T11",
              "T12",
            ],
          },
          options: {
            plotOptions: {
              bar: {
                horizontal: true,
              },
            },
            chart: {
              height: "550px",
            },
          },
        },
      ],
    },
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get_shipper_new_order());
    dispatch(thongke());
  }, []);

  return (
    <div className="px-2 md:px-7 py-5">
      
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7">
        <div className="flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-[#d0d2d6]">
            <h2 className="text-3xl font-bold">{Total_Orders}</h2>
            <span className="text-md font-medium">Đơn Hàng</span>
          </div>
          <div className="w-[46px] h-[47px] rounded-full bg-[#00cfe81f] flex justify-center items-center text-xl">
            <AiOutlineShoppingCart className="text-[#00cfe8] shadow-lg" />
          </div>
        </div>
        <div className="flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-[#d0d2d6]">
            <h2 className="text-3xl font-bold">{Total_VanChuyen}</h2>
            <span className="text-md font-medium">Đơn Hàng Đang Chờ</span>
          </div>
          <div className="w-[46px] h-[47px] rounded-full bg-[#7367f01f] flex justify-center items-center text-xl">
            <AiOutlineShoppingCart className="text-[#7367f0] shadow-lg" />
          </div>
        </div>
      </div>
      <div className="w-full flex flex-wrap mt-7">
        <div className="w-full">
          <div className="w-full bg-[#283046] p-4 rounded-md">
            <table className="w-full text-sm text-left text-[#d0d2d6]">
              <thead className="text-sm text-[#d0d2d6] uppercase border-b border-slate-700">
                <tr>
                  <th scope="col" className="py-3 px-4">
                    Tên người mua
                  </th>
                  <th scope="col" className="py-3 px-4">
                    Địa chỉ giao hàng
                  </th>
                  <th scope="col" className="py-3 px-4">
                    Số điện thoại
                  </th>
                  <th scope="col" className="py-3 px-4">
                    trạng thái đơn hàng
                  </th>
                  <th scope="col" className="py-3 px-4">
                    ngày mua
                  </th>
                  <th scope="col" className="py-3 px-4">
                    hoạt động
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.length &&
                  orders.map((d, i) =>
                    d?.delivery_status === "Vận Chuyển" ? (
                      <tr key={i}>
                        <td
                          scope="row"
                          className="py-3 px-4 font-medium whitespace-nowrap"
                        >
                          {d.shippingInfo.name}
                        </td>
                        <td
                          scope="row"
                          className="py-3 px-4 font-medium whitespace-nowrap"
                        >
                          {d.shippingInfo.address1}
                        </td>
                        <td
                          scope="row"
                          className="py-3 px-4 font-medium whitespace-nowrap"
                        >
                          <span>{d.shippingInfo.phoneNumber}</span>
                        </td>
                        <td
                          scope="row"
                          className="py-3 px-4 font-medium whitespace-nowrap"
                        >
                          <span>{d.delivery_status}</span>
                        </td>
                        <td
                          scope="row"
                          className="py-3 px-4 font-medium whitespace-nowrap"
                        >
                          {d.date}
                        </td>
                        <td
                          scope="row"
                          className="py-3 px-4 font-medium whitespace-nowrap"
                        >
                          <Link
                            to={`/seller/dashboard/order/details/${d._id}`}
                            className="p-[6px] w-full bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50 flex justify-center items-center text-black"
                          >
                            Nhận Đơn Hàng
                          </Link>
                        </td>
                      </tr>
                    ) : (
                      ""
                    )
                  )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShipperDashboard;
