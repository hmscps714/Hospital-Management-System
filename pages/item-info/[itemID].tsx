import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { DetailedItemInfo } from "src/components/ItemInfo/DetailedItemInfo";
import { InventoryItem } from "src/config/interfaces";
import { getInventoryItem } from "src/api/db";
import { CustomLoader } from "src/components/CustomLoader/CustomLoader";
import { useAuth } from "src/context/AuthUserContext";

export const ItemInfo = () => {
  const { authUser, loading, authUserType } = useAuth();
  const router = useRouter();
  const { itemID } = router.query;
  const [item, setItem] = useState<InventoryItem>(null);
  const [err, setErr] = useState<Error>(null);

  useEffect(() => {
    if (loading || !itemID) return;
    if (!authUser || (authUserType !== "admin" && authUserType !== "practitioner")) {
      router.replace("/401");
      return;
    }
    getInventoryItem(itemID as string)
      .then((i) => setItem(i))
      .catch((e) => {
        console.error(e);
        setErr(e);
      });
  }, [loading, authUser, authUserType]);

  return (
    <>
      <title>Item Info</title>
      <h1 style={{ textAlign: "center" }}>Item Details</h1>
      <div>
        {err && <div className="errorMessage">{err.toString()}</div>}
        {!err && item && !loading ? (
          <DetailedItemInfo itemData={item}></DetailedItemInfo>
        ) : (
          <CustomLoader />
        )}
      </div>
    </>
  );
};

export default ItemInfo;
