import React, { useEffect } from 'react'
import { GlobalFilter } from './GlobalFilter'

export const ColumnFilter = ({column,columnfilter,setColumnFilter}:any) => {
    const columnFilterValue = column.getFilterValue();
  return (
    <span>
    Search:{" "}
    <input
      value={columnFilterValue || ""}
      onChange={(value) =>column.setFilterValue(value.target.value)}
    />
  </span>
  )
}