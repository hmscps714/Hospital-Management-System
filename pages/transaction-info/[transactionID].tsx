import React, { useState } from "react";
import { ThemeProvider } from "@mui/material";
import theme from "src/config/theme";
import NavbarHome from "src/components/Navbar/NavbarHome";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Transaction } from "src/config/interfaces";
import { DetailedTransactiontInfo } from "src/components/TransactionInfo/DetailedTransactionInfo";
import { getTransaction } from "src/api/db";

import { CustomLoader } from "src/components/CustomLoader/CustomLoader";

export const PatientInfo = () => {
  const router = useRouter();
  const { transactionID } = router.query;

  const [patient, setPatient] = useState<Transaction>(null);
  const [err, setErr] = useState<Error>(null);

  useEffect(() => {
    if (!transactionID) {
      return;
    }

    getTransaction(transactionID as string)
      .then((p) => setPatient(p))
      .catch((e) => {
        console.error(e);
        setErr(e);
      });
  }, [[transactionID]]);

  return (
    <ThemeProvider theme={theme}>
      <NavbarHome />
      <div>
        {err ? (
          <div className="errorMessage">{err.toString()}</div>
        ) : patient && !err ? (
          <div>
            <DetailedTransactiontInfo transactionData={patient} />
          </div>
        ) : (
          <CustomLoader />
        )}
      </div>
    </ThemeProvider>
  );
};

export default PatientInfo;