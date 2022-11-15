import React, { useMemo } from "react";
import { useTable, usePagination, useGlobalFilter } from "react-table";
import MOCK_DATA from "./MOCK_DATA.json";
import { COLUMNS } from "./columns";
import styles from "./Table.module.css";
import { useRouter } from "next/router";
import { GlobalFilter } from "./GlobalFilter";

export const Table = ({ tableData, routePath }) => {
  const router = useRouter();

  const columnsFromData = Object.keys(tableData[0]).map((key, id) => {
    return {
      Header: key.toUpperCase(),
      accessor: key,
    };
  });

  const columns = useMemo(() => columnsFromData, []);
  const data = useMemo(() => tableData, []);

  const initialState = { hiddenColumns: ["uid"] };

  useTable({
    columns,
    data,
    initialState,
  });

  //Destructure
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    state,
    setGlobalFilter,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      initialState,
    },
    useGlobalFilter,
    usePagination
  );

  const { globalFilter } = state;

  //table structure
  return (
    <>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <table {...getTableProps} className={styles.tables}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} className={styles.tr}>
              {
                //access to each column using map
                headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()} className={styles.th}>
                    {column.render("Header")}
                  </th>
                ))
              }
              <th></th>
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {
            //access to each row
            page.map((row) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  className={styles.tr}
                  onClick={() => router.push(routePath + row.values["uid"])}
                >
                  {
                    //access to individual cells in the rows
                    row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()} className={styles.td}>
                          {cell.render("Cell")}
                        </td>
                      );
                    })
                  }
                </tr>
              );
            })
          }
        </tbody>
      </table>
      <div>
        <button onClick={() => previousPage()}>Previous</button>
        <button onClick={() => nextPage()}>Next</button>
      </div>
    </>
  );
};

export default Table;
