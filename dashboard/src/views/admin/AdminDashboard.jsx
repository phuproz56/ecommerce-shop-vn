/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable jsx-a11y/scope */
import React, { useEffect, useState } from "react";
import { BsCurrencyDollar } from "react-icons/bs";
import { RiProductHuntLine } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Chart from "react-apexcharts";
import { useSelector, useDispatch } from "react-redux";

import { get_admin_dashboard_index_data } from "../../store/Reducers/dashboardIndexReducer";
import RevenueChart from "../components/RevenueChart";
import RevenueTable from "../components/RevenueTable";

const AdminDashboard = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const {
    totalSale,
    totalOrder,
    totalProduct,
    totalSeller,
    recentOrders,
    recentMessage,
    total_thunhap_thang,
    result_ngay,
    t1,
    t2,
    t3,
    t4,
    t5,
    t6,
    t7,
    tt8,
    t9,
    t10,
    t11,
    t12,
  } = useSelector((state) => state.dashboardIndex);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get_admin_dashboard_index_data());
  }, [dispatch]);

  const [chartData, setChartData] = useState({
    series: [
      {
        name: "tổng tiền",
        data: [],
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
          "Jan",
          "Feb",
          "Mar",
          "Apl",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
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
              "Jan",
              "Feb",
              "Mar",
              "Apl",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
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
  });

  useEffect(() => {
    if (!Array.isArray(total_thunhap_thang)) {
      console.error("Data is not an array");
      return null;
    }
    const yourData = total_thunhap_thang;

    const convertedData = yourData.reduce(
      (acc, item) => {
        acc[0].data.push(item.totalAmount);
        return acc;
      },
      [{ name: "Tổng Thu Nhập", data: [] }]
    );

    setChartData({
      ...chartData,
      series: convertedData,
      options: {
        ...chartData.options,
        xaxis: {
          categories: yourData.map((item) => item.manth),
        },
      },
    });
  }, [chartData, total_thunhap_thang]);

  return (
    <div className="px-2 md:px-7 py-5">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7">
        <div className="flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-[#d0d2d6]">
            <h2 className="text-3xl font-bold">
              {totalSale.toLocaleString("vi", {
                style: "currency",
                currency: "VND",
              })}
            </h2>
            <span className="text-md font-medium">Doanh Thu</span>
          </div>
          <div className="w-[46px] h-[47px] rounded-full bg-[#28c76f1f] flex justify-center items-center text-xl">
            <BsCurrencyDollar className="text-[#28c76f] shadow-lg" />
          </div>
        </div>
        <div className="flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-[#d0d2d6]">
            <h2 className="text-3xl font-bold">{totalProduct}</h2>
            <span className="text-md font-medium">Tổng Sản Phẩm</span>
          </div>
          <div className="w-[46px] h-[47px] rounded-full bg-[#e000e81f] flex justify-center items-center text-xl">
            <RiProductHuntLine className="text-[#cd00e8] shadow-lg" />
          </div>
        </div>
        <div className="flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-[#d0d2d6]">
            <h2 className="text-3xl font-bold">{totalSeller}</h2>
            <span className="text-md font-medium">Tổng Số Nhân Viên</span>
          </div>
          <div className="w-[46px] h-[47px] rounded-full bg-[#00cfe81f] flex justify-center items-center text-xl">
            <FaUsers className="text-[#00cfe8] shadow-lg" />
          </div>
        </div>
        <div className="flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-[#d0d2d6]">
            <h2 className="text-3xl font-bold">{totalOrder}</h2>
            <span className="text-md font-medium">Tổng Đơn Hàng</span>
          </div>
          <div className="w-[46px] h-[47px] rounded-full bg-[#7367f01f] flex justify-center items-center text-xl">
            <AiOutlineShoppingCart className="text-[#7367f0] shadow-lg" />
          </div>
        </div>
      </div>
      <div className="w-full flex flex-wrap mt-7">
        <div className="w-full lg:pr-3">
          <div className="w-full bg-[#283046] p-4 rounded-md">
            <h2 className="text-white">Thống kê theo ngày</h2>
            <div class="bg-[#283046] border-none rounded-2 shadow-md h-full">
              <div className="bg-[#283046] rounded-lg shadow-md h-[400px]">
                {/* <RevenueChart chartData={result_ngay} /> */}
                
                <RevenueTable className="text-white" tableData={result_ngay} />
                {/* <iframe
                  class="w-full h-full"
                  src="https://charts.mongodb.com/charts-shop-vn-nlzmx/embed/charts?id=653512a4-c4df-476a-8533-3f3dce2fb8bb&maxDataAge=60&theme=dark&autoRefresh=true"
                  frameborder="0"
                ></iframe> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex mt-7">
        <div className="w-full lg:pr-3">
          <div className="w-full bg-[#283046] p-4 rounded-md">
            <h2 className="text-white">Thống kê theo tháng</h2>
            <div className=" border-none rounded-2 shadow-md h-[350px]">
              <Chart
                options={chartData.options}
                series={chartData.series}
                type="bar"
                height={350}
              />
              {/* <iframe
                class="w-full h-full"
                src="https://charts.mongodb.com/charts-shop-vn-nlzmx/embed/charts?id=65350d57-8afe-46d3-82fe-6fddd28ca39d&maxDataAge=300&theme=dark&autoRefresh=true"
                frameborder="0"
              ></iframe> */}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex mt-7">
        <div className="w-full lg:pr-3">
          <div className="w-full bg-[#283046] p-4 rounded-md">
            <h2 className="text-white">Thống kê theo năm</h2>
            <div className="bg-[#283046] border-none rounded-2 shadow-md h-[350px]">
              <iframe
                class="w-full h-full"
                src="https://charts.mongodb.com/charts-shop-vn-nlzmx/embed/charts?id=65351768-8afe-44a0-8a28-6fddd294071c&maxDataAge=3600&theme=dark&autoRefresh=true"
                frameborder="0"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full p-4  bg-[#283046] rounded-md mt-6">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-lg text-[#d0d2d6] pb-3">
            sản phẩm bán chạy nhất
          </h2>
          <Link className="font-semibold text-sm text-[#d0d2d6] hover:text-green-400">
            Xem tất cả
          </Link>
        </div>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-[#d0d2d6]">
            <thead className="text-sm text-[#d0d2d6] uppercase border-b border-slate-700">
              <tr>
                <th scope="col" className="py-3 px-4">
                  Đơn hàng Id
                </th>
                <th scope="col" className="py-3 px-4">
                  giá
                </th>
                <th scope="col" className="py-3 px-4">
                  trạng thái thanh toán
                </th>
                <th scope="col" className="py-3 px-4">
                  trạng thái đơn hàng
                </th>
                <th scope="col" className="py-3 px-4">
                  Active
                </th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((d, i) => (
                <tr key={i}>
                  <td
                    scope="row"
                    className="py-3 px-4 font-medium whitespace-nowrap"
                  >
                    #{d._id}
                  </td>
                  <td
                    scope="row"
                    className="py-3 px-4 font-medium whitespace-nowrap"
                  >
                    ${d.price}
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
                    <span>{d.payment_status}</span>
                  </td>
                  <td
                    scope="row"
                    className="py-3 px-4 font-medium whitespace-nowrap"
                  >
                    <Link
                      className="hover:text-green-400"
                      to={`/admin/dashboard/order/details/${d._id}`}
                    >
                      view
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
