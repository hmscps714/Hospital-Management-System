import React from "react";
import { ThemeProvider } from "@mui/material";
import theme from "src/config/theme";
import NavbarHome from "src/components/Navbar/NavbarHome";
import Table from "src/components/Tables/Table.js";
import { useState, useEffect } from "react"
import { getAllInventoryItems } from "src/api/db"
import {CustomLoader} from "src/components/CustomLoader/CustomLoader";

export const InventoryList = () => {
  const [inventoryList, setInventoryList] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    if (!inventoryList) {
      getAllInventoryItems()
        .then((x) => {
          setInventoryList(x);
        })
        .catch((e) => {
          console.error(e);
          setErr(e);
        });
    }
  }, [inventoryList]);

  const extractInfo = () => {
    return inventoryList.map((item) => {
      const itemObj = {
        id: item['id'],
        name: item['name'],
        price: item['price'],
        stock: item['stock']
      };
      return itemObj;
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <NavbarHome />
      { err ? <div className="errorMessage">{err.toString()}</div>: inventoryList ? 
      <Table buttonLabel={'Add Item'} tableData={extractInfo()} routePath={'/item-info/'} tableHeadings={'Inventory List'} /> : <CustomLoader/>}
    </ThemeProvider>
  );
};

export default InventoryList;
