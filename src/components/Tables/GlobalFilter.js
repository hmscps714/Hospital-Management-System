import React from 'react'
import styles2 from './filter.module.css'

export const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <div className={styles2.Searchbar}>
      <span>
        <input className={styles2.input} placeholder="Search" value={filter || ''} onChange={(e) => setFilter(e.target.value)} />
      </span>
    </div>
  )
}