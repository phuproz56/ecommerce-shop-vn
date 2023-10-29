import React, { useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { BsImages } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";

const DiscountProducts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const row = [];
  const handleDelete = async (id) => {
    window.location.reload();
  };
  const columns = [
    { field: "id", headerName: "Id", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Mã giảm giá",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "price",
      headerName: "Giá trị",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "Xóa",
      flex: 0.8,
      minWidth: 120,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            {/* <Button onClick={() => handleDelete(params.id)}>
              <AiOutlineDelete size={20} />
            </Button> */}
          </>
        );
      },
    },
  ];
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const [cateShow, setCateShow] = useState(false);
  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="text-white w-full 800px:w-[50%] bg-[#283046] shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll justify-center items-center">
        <h5 className="text-[30px] font-Poppins text-center">
          Tạo Mã khuyến mãi
        </h5>
        {/* create event form */}
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col w-full gap-1 relative">
            <div
              className={`absolute top-[101%] bg-slate-800 w-full transition-all ${
                cateShow ? "scale-100" : "scale-0"
              }`}
            ></div>
          </div>
          <br />
          <div>
            <label className="pb-2">Tên Mã</label>
            <input
              type="text"
              name="tags"
              // value={tags}
              className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6] w-full mt-2"
              // onChange={(e) => setTags(e.target.value)}
              placeholder="Thêm Mã giảm giá..."
            />
          </div>
          <br />
          <div>
            <label className="pb-2">
              Giá khuyến mãi <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="price"
              // value={discountPrice}
              className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6] w-full mt-2"
              // onChange={(e) => setDiscountPrice(e.target.value)}
              placeholder="Giảm giá % ..."
            />
          </div>
          <br />
          <div>
            <label className="pb-2">
              Số lượng <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="price"
              // value={stock}
              className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6] w-full mt-2"
              // onChange={(e) => setStock(e.target.value)}
              placeholder="Số lượng sản phẩm..."
            />
          </div>
          <br />
          <div>
            <label className="pb-2">
              Ngày bắt đầu <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="price"
              id="start-date"
              // value={startDate ? startDate.toISOString().slice(0,10) : ""}
              className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6] w-full mt-2"
              // onChange={handleStartDateChange}
              // min={today}
              placeholder="Enter your event product stock..."
            />
          </div>
          <br />
          <div>
            <label className="pb-2">
              Ngày kết thúc <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="price"
              id="start-date"
              // value={endDate ? endDate.toISOString().slice(0,10) : ""}
              className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6] w-full mt-2"
              // onChange={handleEndDateChange}
              // min={minEndDate}
              placeholder="Enter your event product stock..."
            />
          </div>
          <br />
          <button className="flex border bg-blue-500 p-2 rounded-md justify-items-center">
            Thêm Mã Giảm Giá
          </button>
        </form>
      </div>
    </div>
  );
};

export default DiscountProducts;
