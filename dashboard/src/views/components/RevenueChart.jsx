import React from "react";
import { Line } from "react-chartjs-2";
import { LinearScale, Chart } from "chart.js";

const RevenueChart = ({ data }) => {
  // Kiểm tra xem data có phải là mảng không
  if (!Array.isArray(data)) {
    console.error("Data is not an array");
    return null; // hoặc xử lý lỗi theo cách bạn muốn
  }

  // Nếu data là mảng rỗng, hiển thị một thông báo hoặc xử lý khác
  if (data.length === 0) {
    console.warn("Data array is empty");
    return null; // hoặc xử lý khác
  }

  const chartData = {
    labels: data.map((item) => `${item.manth}/${item.year}`),
    datasets: [
      {
        label: "Doanh Thu",
        data: data.map((item) => item.totalAmount),
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  const options = {
    scales: {
      x: [
        {
          type: "linear",
          position: "bottom",
        },
      ],
      y: [
        {
          type: "linear",
          position: "left",
        },
      ],
    },
  };

  return (
    <div>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default RevenueChart;
