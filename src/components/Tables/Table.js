import React, { useMemo } from "react";
import { useTable, usePagination, useGlobalFilter } from "react-table";
import styles from "./Table.module.css";
import { useRouter } from "next/router";
import { GlobalFilter } from "./GlobalFilter";

export const Table = ({ tableData, routePath, buttonLabel, tableHeadings, buttonRoutePath }) => {
  const router = useRouter();

  const columnsFromData = Object.keys(tableData[0]).map((key, id) => {
    if (key == "uid") {
      return {
        Header: key.toUpperCase(),
        accessor: key,
        disableGlobalFilter: true,
      };
    } else
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
    footerGroups,
    page,
    nextPage,
    previousPage,
    state,
    setGlobalFilter,
    prepareRow,
    rows,
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
        <div className={styles.BtnContainer}>
          <h1 className={styles.Heading}>{tableHeadings}</h1>
          <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
          <button onClick={() => router.push(buttonRoutePath)} className={styles.Add}>
            {buttonLabel}
          </button>
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
                  onClick={() => {
                    let path = "";
                    if (routePath === "/item-info/" || routePath === "/transaction-info/") {
                      path = routePath + row.values["id"];
                    } else {
                      path = routePath + row.values["uid"];
                    }
                    router.push(path);
                  }}
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
        {tableHeadings == "Financial Transactions" && (
          <tfoot className={styles.TableFooter}>
            {footerGroups.map((footerGroup) => (
              <tr {...footerGroup.getFooterGroupProps()}>
                <td className={styles.TDfooter} style={{ fontWeight: "800" }}>
                  Total
                </td>
                <td className={styles.TDfooter}></td>
                <td className={styles.TDfooter}></td>
                <td className={styles.TDfooter} style={{ fontWeight: "800" }}>
                  {rows.map((inp) => inp.values.amount).reduce((acc, curval) => acc + curval, 0)}
                </td>
              </tr>
            ))}
          </tfoot>
        )}
      </table>
      {rows.length > 10 ? (
        <div className={styles.pagesBtn}>
          <button onClick={() => previousPage()}>Previous</button>
          <button onClick={() => nextPage()}>Next</button>
        </div>
      ) : null}
    </>
  );
};

export default Table;
