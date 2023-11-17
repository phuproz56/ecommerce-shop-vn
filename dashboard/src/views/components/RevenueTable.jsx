// RevenueTable.js
import React, { useMemo } from "react";
import { useTable, useSortBy } from "react-table";

const RevenueTable = ({ tableData }) => {
  const columns = useMemo(
    () => [
      {
        Header: "Ngày",
        accessor: "_id", // Đặt tên accessors là _id để tận dụng các giá trị ngày trong mảng của bạn
      },
      {
        Header: "Doanh Thu",
        accessor: "totalAmount",
      },
    ],
    []
  );

  const data = useMemo(() => tableData, [tableData]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  return (
    <table className="text-white" {...getTableProps()} style={{ width: "100%" }}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render("Header")}
                <span>
                  {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
                </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default RevenueTable;
