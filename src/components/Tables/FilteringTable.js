import React, { useMemo } from "react";
import { useTable, useGlobalFilter } from 'react-table'
import MOCK_DATA from './MOCK_DATA.json'
import { COLUMNS } from './columns'
import { GlobalFilter } from "./GlobalFilter";
import styles from './Table.module.css'


export const FilteringTable = () => {

    const columns = useMemo (() => COLUMNS, [])
    const data = useMemo (() => MOCK_DATA, [])

    //Destructure
    const { 
        getTableProps, 
        getTableBodyProps, 
        headerGroups, 
        rows, 
        prepareRow, 
        state,
        setGlobalFilter,
    } =  useTable({
        columns,
        data,
    }, useGlobalFilter)

    const { globalFilter } = state


    //table structure    
    return (
        <>
        <GlobalFilter filter ={globalFilter} setFilter={setGlobalFilter} />
        <table {...getTableProps} className={styles.tables}>
            <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()} className={styles.tr}>
                        {
                            //access to each column using map
                            headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()} className={styles.th}>
                                    {column.render('Header')}
                                </th>
                            ))
                        }
                        <th>

                        </th>
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {
                    //access to each row
                    rows.map(row => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()} className={styles.tr}>
                                {
                                    //access to individual cells in the rows
                                    row.cells.map((cell) => {
                                        return <td {...cell.getCellProps()} className={styles.td}>
                                            {cell.render('Cell')}</td>
                                    })
                                }

                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
        </>
    )
}

export default FilteringTable;