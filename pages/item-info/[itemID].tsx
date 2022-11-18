import React, { useState } from "react";
import { ThemeProvider } from "@mui/material";
import theme from "src/config/theme";
import NavbarHome from "src/components/Navbar/NavbarHome";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { DetailedItemInfo } from "src/components/ItemInfo/DetailedItemInfo";
import { InventoryItem } from "src/config/interfaces";
import { getInventoryItem } from "src/api/db";
import { CustomLoader } from "src/components/CustomLoader/CustomLoader";

export const ItemInfo = () => {
  const router = useRouter();
  const { itemID } = router.query;
  const [item, setItem] = useState<InventoryItem>(null);
  const [err, setErr] = useState<Error>(null);

  useEffect(() => {
    if (!itemID) return;

    getInventoryItem(itemID as string)
      .then((i) => setItem(i))
      .catch((e) => {
        console.error(e);
        setErr(e);
      });
  }, [itemID]);

  return (
    <ThemeProvider theme={theme}>
      <NavbarHome />
      <h1 style={{ textAlign: "center" }}>Item Details</h1>
      <div>
        {err ? <div>Error</div> : null}
        {!err && item ? (
          <DetailedItemInfo itemData={item}>
            <h1>Hello</h1>
          </DetailedItemInfo>
        ) : (
          <CustomLoader></CustomLoader>
        )}
      </div>
    </ThemeProvider>
  );
};

export default ItemInfo;
