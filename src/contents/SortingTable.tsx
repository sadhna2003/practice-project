import React, { useMemo, useState } from 'react';
import {
    useReactTable, getCoreRowModel, flexRender, getSortedRowModel, SortingFn,
    SortingState,
} from '@tanstack/react-table';
import { COLUMNS, GROUP_COLUMNS } from './columns';
import MOCK_DATA from './MOCK_DATA.json';


const SortingTable = () => {
    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => MOCK_DATA, []);
    const [sorting, setSorting] = useState<SortingState>([]);

    const tableInstance = useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel(), // Use the built-in function
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting,
        state: {
            sorting,
        },

    })

    const {
        getHeaderGroups,
        getRowModel,
        getFooterGroups,
    } = tableInstance;

    console.log(getHeaderGroups());

    return (
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
                                                    : (
                                                        <div onClick={header.column.getToggleSortingHandler()}>
                                                            {flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext()
                                                            )}
                                                            {{
                                                                asc: ' 🔼',
                                                                desc: ' 🔽',
                                                            }[header.column.getIsSorted() as string] ?? ' 🔃'}
                                                        </div>
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
    )
}

export default SortingTable