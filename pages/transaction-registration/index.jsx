import React, { useEffect } from "react";
import CreateTransactionForm from "src/components/forms/TransactionForm";
import { useAuth } from "src/context/AuthUserContext";
import { useRouter } from "next/router";
import { CustomLoader } from "src/components/CustomLoader/CustomLoader";

export const PriceRegistration = () => {
  const { authUser, loading, authUserType } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!authUser || authUserType !== "admin") {
      router.replace("/401");
      return;
    }
  }, [loading, authUser, authUserType]);

  return (
    <>
      <title>Transaction Registration</title>
      {!loading ? <CreateTransactionForm /> : <CustomLoader />}
    </>
  );
};

export default PriceRegistration;
