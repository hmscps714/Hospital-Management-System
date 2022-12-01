import React, { useState, useEffect } from "react";
import Table from "src/components/Tables/Table";
import { getAllInventoryItems } from "src/api/db";
import { CustomLoader } from "src/components/CustomLoader/CustomLoader";
import { useAuth } from "src/context/AuthUserContext";
import { useRouter } from "next/router";

export const InventoryList = () => {
  const { authUser, loading, authUserType } = useAuth();
  const router = useRouter();
  const [inventoryList, setInventoryList] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    if (loading) return;
    if (!authUser || (authUserType !== "admin" && authUserType !== "practitioner")) {
      router.replace("/401");
      return;
    }
    getAllInventoryItems()
      .then((x) => {
        setInventoryList(x);
      })
      .catch((e) => {
        console.error(e);
        setErr(e);
      });
  }, [loading, authUser, authUserType]);

  const extractInfo = () => {
    return inventoryList.map((item) => {
      const itemObj = {
        id: item["id"],
        name: item["name"],
        price: item["price"],
        stock: item["stock"],
      };
      return itemObj;
    });
  };

  return (
    <>
      <title>Inventory List</title>
      {err && <div className="errorMessage">{err.toString()}</div>}
      {!err && inventoryList && !loading ? (
        <Table
          buttonLabel={"Add Item"}
          tableData={extractInfo()}
          routePath={"/item-info/"}
          tableHeadings={"Inventory List"}
          buttonRoutePath={"/item-registration"}
        />
      ) : (
        <CustomLoader />
      )}
    </>
  );
};

export default InventoryList;
