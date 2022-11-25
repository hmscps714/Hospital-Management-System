import React from "react";
import { ThemeProvider } from "@mui/material";
import theme from "src/config/theme";
import NavbarHome from "src/components/Navbar/NavbarHome";
import Table from "src/components/Tables/Table.js";
import { useState, useEffect } from "react";
import { getAllTransactions } from "src/api/db";
import { CustomLoader } from "src/components/CustomLoader/CustomLoader";

export const TransactionList = () => {
  const [transactionList, setTransactionList] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    if (!transactionList) {
      getAllTransactions()
        .then((x) => {
          setTransactionList(x);
        })
        .catch((e) => {
          console.error(e);
          setErr(e);
        });
    }
  }, [transactionList]);

  const extractInfo = () => {
    return transactionList.map((item) => {
      const itemObj = {
        id: item["id"],
        name: item["name"],
        type: item["type"],
        amount: item["amount"],
      };
      return itemObj;
    });
  };

  return (
    <ThemeProvider theme={theme}>
      {console.log(transactionList)}
      <NavbarHome />
      {err ? (
        <div className="errorMessage">{err.toString()}</div>
      ) : transactionList ? (
        <Table
          buttonLabel={"Add Transaction"}
          tableData={extractInfo()}
          routePath={"/transaction-info/"}
          tableHeadings={"Financial Transactions"}
          buttonRoutePath={"/transaction-registration"}
        />
      ) : (
        <CustomLoader />
      )}
    </ThemeProvider>
  );
};

export default TransactionList;
