import React, { useMemo, useState } from 'react';
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, PaginationState } from '@tanstack/react-table';
import { COLUMNS, GROUP_COLUMNS } from './columns';
import MOCK_DATA from './MOCK_DATA.json';


const PaginationTable = () => {
    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => MOCK_DATA, []);
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10
    });

    const tableInstance = useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel(), // Use the built-in function
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        state: {
            pagination
        },

    })

    const {
        getHeaderGroups,
        getRowModel,
        getFooterGroups,
    } = tableInstance;

    // console.log(getHeaderGroups());
    return (
        <>
            <div>
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
                                                </th>
                                            )
                                        })}
                                    </tr>
                                )
                            })}
                    </thead>
                    <tbody>
                        {getRowModel().rows.map((row: any) => {
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
                        })}
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
            <div className='pagination'>
                <span className="pagination-info">
                    <div>Page</div>
                    <strong>
                        {tableInstance.getState().pagination.pageIndex + 1} of{' '}
                        {tableInstance.getPageCount().toLocaleString()}
                    </strong>
                </span>
                <span>
                    <select
                        value={tableInstance.getState().pagination.pageSize}
                        onChange={e => tableInstance.setPageSize(Number(e.target.value))}>
                        {[10,20,30,40,50,100].map(pageSize => 
                            <option key={pageSize} value={pageSize}>{pageSize}</option>
                        )}
                    </select>
                </span>
                <span className='goto'>
                    | Go to page:{' '}
                    <input
                        type='numner'
                        defaultValue={tableInstance.getState().pagination.pageIndex + 1}
                        onChange={(e) => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0
                            tableInstance.setPageIndex(page)
                        }}
                    />
                </span>
                <button
                    onClick={() => tableInstance.firstPage()}
                    disabled={!tableInstance.getCanPreviousPage()}
                >
                    First Page
                </button>
                <button
                    onClick={() => tableInstance.previousPage()}
                    disabled={!tableInstance.getCanPreviousPage()}>
                    Previous
                </button>
                <button
                    onClick={() => tableInstance.nextPage()}
                    disabled={!tableInstance.getCanNextPage()}>
                    Next
                </button>
                <button
                    onClick={() => tableInstance.lastPage()}
                    disabled={!tableInstance.getCanNextPage()}
                >
                    Last Page
                </button>
            </div>
        </>
    )
}

export default PaginationTable