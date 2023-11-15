/* eslint-disable jsx-a11y/scope */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { PropagateLoader } from "react-spinners";
import { GrClose } from "react-icons/gr";
import Pagination from "../Pagination";
import { BsImage } from "react-icons/bs";
import { overrideStyle } from "../../utils/utils";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import Search from "../components/Search";
import {
  categoryAdd,
  get_category,
  messageClear,
  xoa_category,
  brandAdd,
  get_brand,
  xoa_brand,
} from "../../store/Reducers/categoryReducer";
import { Tooltip } from "antd";
import { RxCross1 } from "react-icons/rx";

const Category = () => {
  const dispatch = useDispatch();
  const {
    loader,
    successMessage,
    errorMessage,
    categorys,
    totalCategory,
    brands,
    totalBrand,
  } = useSelector((state) => state.category);
  const [open, setOpen] = useState("");
  const [openB, setOpenB] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [parPage, setParPage] = useState(5);

  const [searchValueBrand, setSearchValueBrand] = useState("");
  const [currentPageBrand, setCurrentPageBrand] = useState(1);
  const [parPageBrand, setParPageBrand] = useState(5);

  const [show, setShow] = useState(false);
  const [imageShow, setImage] = useState("");

  const [state, setState] = useState({
    name: "",
    image: "",
  });

  const [brand, setBrand] = useState({
    name: "",
  });

  const imageHandle = (e) => {
    let files = e.target.files;
    if (files.length > 0) {
      setImage(URL.createObjectURL(files[0]));
      setState({
        ...state,
        image: files[0],
      });
    }
  };

  const add_category = (e) => {
    e.preventDefault();
    dispatch(categoryAdd(state));
  };

  const add_brand = (e) => {
    e.preventDefault();
    dispatch(brandAdd(brand));
  };

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      setState({
        name: "",
        image: "",
      });
      setImage("");
      window.location.reload();
    }
  }, [successMessage, errorMessage]);

  useEffect(() => {
    const obj = {
      parPage: parseInt(parPage),
      page: parseInt(currentPage),
      searchValue,
    };

    const obj_brand = {
      parPage: parseInt(parPageBrand),
      page: parseInt(currentPageBrand),
      searchValueBrand,
    };
    dispatch(get_category(obj));
    dispatch(get_brand(obj));
  }, [
    searchValue,
    currentPage,
    parPage,
    parPageBrand,
    currentPageBrand,
    searchValueBrand,
  ]);

  useEffect(() => {}, []);

  const delete_category = (_id) => {
    dispatch(xoa_category(_id));
  };

  const delete_brand = (_id) => {
    dispatch(xoa_brand(_id));
  };

  return (
    <div className="px-2 lg:px-7 pt-5">
      {open && (
        <div className="fixed w-full h-screen bg-[#0000004b] top-0 left-0 flex items-center justify-center">
          {" "}
          <div className="p-4 w-[400px] h-[230px] bg-white rounded shadow relative">
            <div className="w-full flex justify-end p-3">
              <RxCross1
                size={30}
                className="cursor-pointer"
                onClick={() => setOpen("")}
              />
            </div>
            <h1 className="text-center text-[25px] font-Poppins">
              Bạn Chắc Chắn Muốn Xóa Danh Mục Này?
            </h1>
            <div className="p-[100px] flex justify-between items-center pt-4">
              <button
                onClick={() => setOpen("")}
                className="flex border p-2 bg-red-500 rounded-md text-white"
              >
                Không
              </button>
              <button
                onClick={() => delete_category(open)}
                className="flex border p-2 bg-green-500 rounded-md text-white"
              >
                Có
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex lg:hidden justify-between items-center mb-5 p-4 bg-[#283046] rounded-md">
        <h1 className="text-[#d0d2d6] font-semibold text-lg">Categorys</h1>
        <button
          onClick={() => setShow(true)}
          className="bg-indigo-500 shadow-lg hover:shadow-indigo-500/50 px-4 py-2 cursor-pointer text-white rounded-sm text-sm"
        >
          Add
        </button>
      </div>
      <div className="flex flex-wrap w-full">
        <div className="w-full lg:w-7/12">
          <div className="w-full p-4  bg-[#283046] rounded-md">
            <Search
              setParPage={setParPage}
              setSearchValue={setSearchValue}
              searchValue={searchValue}
            />
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-[#d0d2d6]">
                <thead className="text-sm text-[#d0d2d6] uppercase border-b border-slate-700">
                  <tr>
                    <th scope="col" className="py-3 px-4">
                      No
                    </th>
                    <th scope="col" className="py-3 px-4">
                      hình ảnh
                    </th>
                    <th scope="col" className="py-3 px-4">
                      tên
                    </th>
                    <th scope="col" className="py-3 px-4">
                      hoạt động
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {categorys.map((d, i) => (
                    <tr key={i}>
                      <td
                        scope="row"
                        className="py-1 px-4 font-medium whitespace-nowrap"
                      >
                        {i + 1}
                      </td>
                      <td
                        scope="row"
                        className="py-1 px-4 font-medium whitespace-nowrap"
                      >
                        <img
                          className="w-[45px] h-[45px]"
                          src={d.image}
                          alt=""
                        />
                      </td>
                      <td
                        scope="row"
                        className="py-1 px-4 font-medium whitespace-nowrap"
                      >
                        <span>{d.name}</span>
                      </td>
                      <td
                        scope="row"
                        className="py-1 px-4 font-medium whitespace-nowrap"
                      >
                        <div className="flex justify-start items-center gap-4">
                          <Tooltip title="Xóa danh mục">
                            <button
                              onClick={() => setOpen(d._id)}
                              className="p-[6px] bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50"
                            >
                              <FaTrash />
                            </button>
                          </Tooltip>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="w-full flex justify-end mt-4 bottom-4 right-4">
              {totalCategory >= parPage && (
                <Pagination
                  pageNumber={currentPage}
                  setPageNumber={setCurrentPage}
                  totalItem={totalCategory}
                  parPage={parPage}
                  showItem={totalCategory - parPage}
                />
              )}
            </div>
          </div>
        </div>
        <div
          className={`w-[320px] lg:w-5/12 translate-x-100 lg:relative lg:right-0 fixed ${
            show ? "right-0" : "-right-[340px]"
          } z-[9999] top-0 transition-all duration-500`}
        >
          <div className="w-full pl-5">
            <div className="bg-[#283046] h-screen lg:h-auto px-3 py-2 lg:rounded-md text-[#d0d2d6]">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-[#d0d2d6] font-semibold text-xl">
                  Thêm loại sản phẩm
                </h1>
                <div
                  onClick={() => setShow(false)}
                  className="block lg:hidden cursor-pointer"
                >
                  <GrClose className="text-[#d0d2d6]" />
                </div>
              </div>
              <form onSubmit={add_category}>
                <div className="flex flex-col w-full gap-1 mb-3">
                  <label htmlFor="name">tên loại sản phẩm</label>
                  <input
                    value={state.name}
                    onChange={(e) =>
                      setState({ ...state, name: e.target.value })
                    }
                    className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                    type="text"
                    id="name"
                    name="category_name"
                    placeholder="Nhập tên loại danh mục sản phẩm"
                    required
                  />
                </div>
                <div>
                  <label
                    className="flex justify-center items-center flex-col h-[238px] cursor-pointer border border-dashed hover:border-indigo-500 w-full border-[#d0d2d6]"
                    htmlFor="image"
                  >
                    {imageShow ? (
                      <img
                        className="w-full h-full"
                        src={imageShow}
                        alt="imageshow"
                      />
                    ) : (
                      <>
                        <span>
                          <BsImage />
                        </span>
                        <span>chọn hình ảnh</span>
                      </>
                    )}
                  </label>
                </div>
                <input
                  onChange={imageHandle}
                  className="hidden"
                  type="file"
                  name="image"
                  id="image"
                  required
                />
                <div className="mt-4">
                  <button
                    disabled={loader ? true : false}
                    className="bg-blue-500 w-full hover:shadow-blue-500/20 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3"
                  >
                    {loader ? (
                      <PropagateLoader
                        color="#fff"
                        cssOverride={overrideStyle}
                      />
                    ) : (
                      "Thêm danh mục"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* ************************* Thương hiệu ************************ */}

      <div className="pt-[20px]">
        {openB && (
          <div className="fixed w-full h-screen bg-[#0000004b] top-0 left-0 flex items-center justify-center">
            {" "}
            <div className="p-4 w-[400px] h-[230px] bg-white rounded shadow relative">
              <div className="w-full flex justify-end p-3">
                <RxCross1
                  size={30}
                  className="cursor-pointer"
                  onClick={() => setOpenB("")}
                />
              </div>
              <h1 className="text-center text-[25px] font-Poppins">
                Bạn Chắc Chắn Muốn Xóa Thương Hiệu Này?
              </h1>
              <div className="p-[100px] flex justify-between items-center pt-4">
                <button
                  onClick={() => setOpenB("")}
                  className="flex border p-2 bg-red-500 rounded-md text-white"
                >
                  Không
                </button>
                <button
                  onClick={() => delete_brand(openB)}
                  className="flex border p-2 bg-green-500 rounded-md text-white"
                >
                  Có
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="flex lg:hidden justify-between items-center mb-5 p-4 bg-[#283046] rounded-md">
          <h1 className="text-[#d0d2d6] font-semibold text-lg">Thương Hiệu</h1>
          <button
            onClick={() => setShow(true)}
            className="bg-indigo-500 shadow-lg hover:shadow-indigo-500/50 px-4 py-2 cursor-pointer text-white rounded-sm text-sm"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap w-full">
          <div className="w-full lg:w-7/12">
            <div className="w-full p-4  bg-[#283046] rounded-md">
              <Search
                setParPage={setParPage}
                setSearchValue={setSearchValue}
                searchValue={searchValue}
              />
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-[#d0d2d6]">
                  <thead className="text-sm text-[#d0d2d6] uppercase border-b border-slate-700">
                    <tr>
                      <th scope="col" className="py-3 px-4">
                        No
                      </th>
                      <th scope="col" className="py-3 px-4">
                        tên
                      </th>
                      <th scope="col" className="py-3 px-4">
                        hoạt động
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {brands.map((d, i) => (
                      <tr key={i}>
                        <td
                          scope="row"
                          className="py-1 px-4 font-medium whitespace-nowrap"
                        >
                          {i + 1}
                        </td>
                        <td
                          scope="row"
                          className="py-1 px-4 font-medium whitespace-nowrap"
                        >
                          <span>{d.name}</span>
                        </td>
                        <td
                          scope="row"
                          className="py-1 px-4 font-medium whitespace-nowrap"
                        >
                          <div className="flex justify-start items-center gap-4">
                            <Tooltip title="Xóa danh mục">
                              <button
                                onClick={() => setOpenB(d._id)}
                                className="p-[6px] bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50"
                              >
                                <FaTrash />
                              </button>
                            </Tooltip>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="w-full flex justify-end mt-4 bottom-4 right-4">
                {totalBrand >= parPageBrand && (
                  <Pagination
                    pageNumber={currentPageBrand}
                    setPageNumber={setCurrentPageBrand}
                    totalItem={totalBrand}
                    parPage={parPageBrand}
                    showItem={totalBrand - parPageBrand}
                  />
                )}
              </div>
            </div>
          </div>
          <div
            className={`w-[320px] lg:w-5/12 translate-x-100 lg:relative lg:right-0 fixed ${
              show ? "right-0" : "-right-[340px]"
            } z-[9999] top-0 transition-all duration-500`}
          >
            <div className="w-full pl-5">
              <div className="bg-[#283046] h-screen lg:h-auto px-3 py-2 lg:rounded-md text-[#d0d2d6]">
                <div className="flex justify-between items-center mb-4">
                  <h1 className="text-[#d0d2d6] font-semibold text-xl">
                    Thêm tên thương hiệu sản phẩm
                  </h1>
                  <div
                    onClick={() => setShow(false)}
                    className="block lg:hidden cursor-pointer"
                  >
                    <GrClose className="text-[#d0d2d6]" />
                  </div>
                </div>
                <form onSubmit={add_brand}>
                  <div className="flex flex-col w-full gap-1 mb-3">
                    <label htmlFor="brand">tên thương hiệu sản phẩm</label>
                    <input
                      value={brand.name}
                      onChange={(e) =>
                        setBrand({ ...brand, name: e.target.value })
                      }
                      className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                      type="text"
                      id="brand"
                      name="brand_name"
                      placeholder="Nhập tên thương hiệu sản phẩm"
                      required
                    />
                  </div>
                  <div className="mt-4">
                    <button
                      disabled={loader ? true : false}
                      className="bg-blue-500 w-full hover:shadow-blue-500/20 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3"
                    >
                      {loader ? (
                        <PropagateLoader
                          color="#fff"
                          cssOverride={overrideStyle}
                        />
                      ) : (
                        "Thêm tên thương hiệu"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
