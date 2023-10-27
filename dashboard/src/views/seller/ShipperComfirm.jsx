/* eslint-disable jsx-a11y/scope */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";
import Search from "../components/Search";
import { useSelector, useDispatch } from "react-redux";
import { get_seller_orders } from "../../store/Reducers/OrderReducer";
const ShipperComfirm = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [parPage, setParPage] = useState(5);
  const { myOrders, totalOrder } = useSelector((state) => state.order);
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(
      get_seller_orders({
        parPage: parseInt(parPage),
        page: parseInt(currentPage),
        searchValue,
        sellerId: userInfo._id,
      })
      // get_admin_orders({
      //   sellerId: userInfo._id,
      //   parPage: parseInt(parPage),
      //   page: parseInt(currentPage),
      //   searchValue,
      // })
    );
  }, [parPage, currentPage, searchValue]);

  return (
    <div className="px-2 lg:px-7 pt-5 ">
      <div className="w-full p-4  bg-[#283046] rounded-md">
        <Search
          setParPage={setParPage}
          setSearchValue={setSearchValue}
          searchValue={searchValue}
        />
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-[#d0d2d6]">
            <thead className="text-sm text-[#d0d2d6] uppercase border-b border-slate-700">
              <tr>
                <th scope="col" className="py-3 px-4">
                  Tên Shipper
                </th>
                <th scope="col" className="py-3 px-4">
                  Số điện thoại
                </th>

                <th scope="col" className="py-3 px-4">
                  trạng thái đơn hàng
                </th>
                <th scope="col" className="py-3 px-4">
                  Ngày shipper nhận đơn
                </th>
                <th scope="col" className="py-3 px-4">
                  Hành Động
                </th>
              </tr>
            </thead>
            <tbody>
              {myOrders.map(
                (d, i) =>
                  d.delivery_status === "Tìm Shipper" && (
                    <tr key={i}>
                      <td
                        scope="row"
                        className="py-3 px-4 font-medium whitespace-nowrap"
                      >
                        {d.shipperInfo?.name ? (
                          d.shipperInfo?.name
                        ) : (
                          <p className="text-red-500">(Đang tìm)</p>
                        )}
                      </td>
                      <td
                        scope="row"
                        className="py-3 px-4 font-medium whitespace-nowrap"
                      >
                        {d.shipperInfo?.phoneNumber ? (
                          d.shipperInfo?.phoneNumber
                        ) : (
                          <p className="text-red-500">(Đang tìm)</p>
                        )}
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
                        {d.shipper_date ? (
                          d.shipper_date
                        ) : (
                          <p className="text-red-500">(Đang tìm)</p>
                        )}
                      </td>
                      {d.shipperInfo ? (
                        <td
                          scope="row"
                          className="py-3 px-4 font-medium whitespace-nowrap"
                        >
                          <Link
                            to={`/seller/dashboard/order/details/${d._id}`}
                            className="p-[6px] w-[30px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50 flex justify-center items-center"
                          >
                            <FaEye />
                          </Link>
                        </td>
                      ) : (
                        ""
                      )}
                    </tr>
                  )
              )}
            </tbody>
          </table>
        </div>
        {totalOrder <= parPage ? (
          ""
        ) : (
          <div className="w-full flex justify-end mt-4 bottom-4 right-4">
            <Pagination
              pageNumber={currentPage}
              setPageNumber={setCurrentPage}
              totalItem={totalOrder}
              parPage={parPage}
              showItem={3}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ShipperComfirm;
