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
  }
  const [category, setCategory] = useState("");
  
  const [cateShow, setCateShow] = useState(false);
  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="text-white w-full 800px:w-[50%] bg-[#283046] shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll justify-center items-center">
    <h5 className="text-[30px] font-Poppins text-center">Tạo sự kiện, khuyến mãi</h5>
    {/* create event form */}
    <form onSubmit={handleSubmit}>
      <br />
      <div>
        <label className="pb-2">
          Tên sự kiện <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="name"
          // value={name}
          className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6] w-full mt-2"
          // onChange={(e) => setName(e.target.value)}
          placeholder="Thêm tên sự kiện..."
        />
      </div>
      <br />
      <div>
        <label className="pb-2">
          Mô tả <span className="text-red-500">*</span>
        </label>
        <textarea
          cols="30"
          required
          rows="8"
          type="text"
          name="description"
          // value={description}
          className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6] w-full mt-2"
          // onChange={(e) => setDescription(e.target.value)}
          placeholder="Mô tả sự kiện, nội dung..."
        ></textarea>
      </div>
      <br />
      <div className="flex flex-col w-full gap-1 relative">
                <label htmlFor="category">Thể Loại</label>
                <input
                  readOnly
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                  // onChange={inputHandle}
                  // value={category}
                  // onClick={() => setCateShow(!cateShow)}
                  type="text"
                  placeholder="--select category--"
                  id="category"
                />
                <div
                  className={`absolute top-[101%] bg-slate-800 w-full transition-all ${
                    cateShow ? "scale-100" : "scale-0"
                  }`}
                >
                  <div className="w-full px-4 py-2 fixed">
                    <input
                      // value={searchValue}
                      // onChange={categorySearch}
                      className="px-3 py-1 w-full focus:border-indigo-500 outline-none bg-transparent border border-slate-700 rounded-md text-[#d0d2d6] overflow-hidden"
                      type="text"
                      placeholder="search"
                    />
                  </div>
                  <div className="pt-14"></div>
                  <div className="flex justify-start items-start flex-col h-[200px] overflow-x-scroll">
                    {[123].map((c, i) => (
                      <span
                        key={i}
                        className={`px-4 py-2 hover:bg-indigo-500 hover:text-white hover:shadow-lg w-full cursor-pointer ${
                          category === c.name && "bg-indigo-500"
                        }`}
                        // onClick={() => {
                        //   setCateShow(false);
                        //   setCategory(c.name);
                        //   setSearchValue("");
                        //   setAllCategory(categorys);
                        // }}
                      >
                        {c.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
      <br />
      <div>
        <label className="pb-2">Tags</label>
        <input
          type="text"
          name="tags"
          // value={tags}
          className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6] w-full mt-2"
          // onChange={(e) => setTags(e.target.value)}
          placeholder="Thêm tag cho sản phẩm khuyến mãi..."
        />
      </div>
      <br />
      <div>
        <label className="pb-2">Giá gốc</label>
        <input
          type="number"
          name="price"
          // value={originalPrice}
          className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6] w-full mt-2"
          // onChange={(e) => setOriginalPrice(e.target.value)}
          placeholder="Nhập giá gốc..."
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
          placeholder="Giá khuyến mãi của sản phẩm trong sự kiện..."
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
      <div>
        <label className="pb-2">
         Hình ảnh <span className="text-red-500">*</span>
        </label>
        <input
          type="file"
          name=""
          id="upload"
          className="hidden"
          multiple
          // onChange={handleImageChange}
        />
        <div className="grid lg:grid-cols-4 grid-cols-1 md:grid-cols-3 sm:grid-cols-2 sm:gap-4 md:gap-4 xs:gap-4 gap-3 w-full text-[#d0d2d6] mb-4">
              {[123].map((img, i) => (
                <div className="h-[180px] relative">
                  <label htmlFor={i}>
                    <img
                      className="w-full h-full rounded-sm"
                      // src={img.url}
                      alt=""
                    />
                  </label>
                  <input
                    // onChange={(e) => changeImage(e.target.files[0], i)}
                    type="file"
                    id={i}
                    className="hidden"
                  />
                  <span
                    // onClick={() => removeImage(i)}
                    className="p-2 z-10 cursor-pointer bg-slate-700 hover:shadow-lg hover:shadow-slate-400/50 text-white absolute top-1 right-1 rounded-full"
                  >
                    <IoCloseSharp />
                  </span>
                </div>
              ))}
              <label
                className="flex justify-center items-center flex-col h-[180px] cursor-pointer border border-dashed hover:border-indigo-500 w-full text-[#d0d2d6]"
                htmlFor="image"
              >
                <span>
                  <BsImages />
                </span>
                <span>Chọn hình ảnh (2 hình ảnh trở lên)</span>
              </label>
              <input
                multiple
                // onChange={inmageHandle}
                className="hidden"
                type="file"
                id="image"
              />
            </div>
        <br />
        <div>
          <input
            type="submit"
            value="Thêm sự kiện"
            className="bg-blue-500 mt-2 cursor-pointer appearance-none text-center block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>
    </form>
  </div>
    </div>
  );
};

export default DiscountProducts;
