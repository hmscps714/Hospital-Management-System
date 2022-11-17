import React, { useMemo } from "react";
import { useTable, usePagination, useGlobalFilter } from "react-table";
import { COLUMNS } from "./columns";
import styles from "./Table.module.css";
import { useRouter } from "next/router";
import { GlobalFilter } from "./GlobalFilter";
import styles2 from "./filter.module.css";

export const Table = ({ tableData, routePath, buttonLabel}) => {
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
    <div className={styles.search}>
      <GlobalFilter filter ={globalFilter} setFilter={setGlobalFilter} />
      <div className={styles.Btn}>
          {/* <a href="http://localhost:3000/forms"> */}
            <button onClick={() => router.push("/forms")}
            className={styles.Add}>{buttonLabel}</button>
          {/* </a> */}
        </div>
    </div>
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
        <button className={styles.previous} onClick={() => previousPage()}>Previous</button>
        <button className={styles.next} onClick={() => nextPage()}>Next</button>
    </div>
    </>
  );
};

export default Table;
