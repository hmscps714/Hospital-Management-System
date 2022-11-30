import React, { useState, useEffect } from "react";
import Table from "src/components/Tables/Table";
import { getAllTransactions } from "src/api/db";
import { CustomLoader } from "src/components/CustomLoader/CustomLoader";
import { useAuth } from "src/context/AuthUserContext";
import { useRouter } from "next/router";

export const FinancialList = () => {
  const { authUser, loading, authUserType } = useAuth();
  const router = useRouter();
  const [transactionList, setTransactionList] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    if (loading) return;
    if (!authUser || authUserType !== "admin") {
      router.replace("/401");
      return;
    }
    getAllTransactions()
      .then((x) => {
        setTransactionList(x);
      })
      .catch((e) => {
        console.error(e);
        setErr(e);
      });
  }, [loading, authUser, authUserType]);

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
    <>
      <title>Financial</title>
      {err && <div className="errorMessage">{err.toString()}</div>}
      {!err && transactionList && !loading ? (
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
    </>
  );
};

export default FinancialList;
