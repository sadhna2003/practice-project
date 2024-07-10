import React, { useMemo, useState } from 'react';
import { useReactTable, getCoreRowModel, flexRender, getFilteredRowModel, ColumnFiltersState } from '@tanstack/react-table';
import { COLUMNS, GROUP_COLUMNS } from './columns';
import MOCK_DATA from './MOCK_DATA.json';
import { GlobalFilter } from './GlobalFilter';
import { ColumnFilter } from './ColumnFilter';

const GlobalFilteringTable = () => {
    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => MOCK_DATA, []);
    const [filter, setfilter] = useState('');
    const [columnfilter,setColumnFilter] = useState<ColumnFiltersState>([]);

    const tableInstance = useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel(), // Use the built-in function
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            globalFilter: filter,
            columnFilters: columnfilter
        },
        onGlobalFilterChange: setfilter,
        onColumnFiltersChange: setColumnFilter
    })

    const {
        getHeaderGroups,
        getRowModel,
        getFooterGroups,
    } = tableInstance;

    console.log(columnfilter,"val");
    return (

        <div>
            <GlobalFilter filter={filter} setfilter={setfilter} />
            <table id="customers">
                <thead>
                    {
                        getHeaderGroups().map((headerGroup: any) => {
                            return (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map((header: any) => {
                                        return (
                                            <th key={header.id} colSpan={header.colSpan}>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                                    <div className='' key={header.id}>
                                                    
                                                        {header.column.getCanFilter() ? (
                                                            <ColumnFilter column={header.column}  setColumnFilter={setColumnFilter} />
                                                        ): null}
                                                    
                                                    </div>
                                            </th>
                                        )
                                    })}
                                </tr>
                            )
                        })}
                </thead>
                <tbody>
                    {getRowModel().rows.length > 0 ? (
                        
                            getRowModel().rows.map((row: any) => {
                                return (
                                    <tr key={row.id}>
                                        {row.getVisibleCells().map((cell: any) => {
                                            return (
                                                <td key={cell.id}>
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </td>
                                            )
                                        })}
                                    </tr>
                                )
                            })
                        

                    ) : (
                        <tr>
                            <td colSpan={columns.length} >
                                No data found
                            </td>
                        </tr>
                    )}
                </tbody>
                <tfoot>
                    {/* {getFooterGroups().map((footerGroup:any)=>{
                        return (
                            <tr>
                                {footerGroup.headers.map((header:any)=>{
                                    <td key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </td>
                                })}
                            </tr>
                        )
                    })} */}

                    {/* { getHeaderGroups().map((headerGroup: any) => {
                            return (
                                <tr>
                                    {headerGroup.headers.map((header: any) => {
                                        return (
                                            <th key={header.id}>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                            </th>
                                        )
                                    })}
                                </tr>
                            )
                        })} */}
                </tfoot>
            </table>

        </div>
    )
}

export default GlobalFilteringTable