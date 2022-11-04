import React, { useMemo } from "react";
import { useTable } from 'react-table'
import MOCK_DATA from './MOCK_DATA.json'
import { COLUMNS } from './columns'
import styles from './Table.module.css'

export const Table = () => {

    const columns = useMemo (() => COLUMNS, [])
    const data = useMemo (() => MOCK_DATA, [])

    const tableInstance = useTable({
        columns,
        data
    })

    //Destructure
    const { 
        getTableProps, 
        getTableBodyProps, 
        headerGroups, 
        rows, 
        prepareRow, 
    } = tableInstance

    //table structure    
    return (
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
                            <tr {...row.getRowProps()}>
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
    )
}

export default Table;