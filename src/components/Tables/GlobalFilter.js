import React from "react";
import styles2 from "./filter.module.css";
import Image from "next/image";

export const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <div className={styles2.SearchBar}>
      <div className={styles2.SearchIcon}>
        <Image src={"/search-icon.png"} width="32px" height="32px"></Image>
      </div>
      <input
        className={styles2.input}
        placeholder="Search"
        value={filter || ""}
        onChange={(e) => setFilter(e.target.value)}
      />
    </div>
  );
};
