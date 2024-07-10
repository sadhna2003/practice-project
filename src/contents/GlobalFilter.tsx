import React from 'react'

export const GlobalFilter = ({filter,setfilter}:any) => {
  return (
    <span>
      Search:{" "}
      <input
        value={filter || ""}
        onChange={(e) => setfilter(e.target.value)}
      />
    </span>
  )
}
