import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Transaction } from "src/config/interfaces";
import { DetailedTransactionInfo } from "src/components/TransactionInfo/DetailedTransactionInfo";
import { getTransaction } from "src/api/db";
import { CustomLoader } from "src/components/CustomLoader/CustomLoader";
import { useAuth } from "src/context/AuthUserContext";

export const PatientInfo = () => {
  const { authUser, loading, authUserType } = useAuth();
  const router = useRouter();
  const { transactionID } = router.query;
  const [transaction, setTransaction] = useState<Transaction>(null);
  const [err, setErr] = useState<Error>(null);

  useEffect(() => {
    if (loading || !transactionID) return;
    if (!authUser || authUserType !== "admin") {
      router.replace("/401");
      return;
    }
    getTransaction(transactionID as string)
      .then((t) => setTransaction(t))
      .catch((e) => {
        console.error(e);
        setErr(e);
      });
  }, [loading, authUser, authUserType]);

  return (
    <>
      <title>Transaction Info</title>
      {err && <div className="errorMessage">{err.toString()}</div>}
      {!err && transaction && !loading ? (
        <DetailedTransactionInfo transactionData={transaction} />
      ) : (
        <CustomLoader />
      )}
    </>
  );
};

export default PatientInfo;
