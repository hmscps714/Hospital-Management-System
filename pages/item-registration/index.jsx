import React, { useEffect } from "react";
import CreateItemForm from "src/components/forms/CreateItemForm";
import { useAuth } from "src/context/AuthUserContext";
import { useRouter } from "next/router";
import { CustomLoader } from "src/components/CustomLoader/CustomLoader";

export const ItemRegistration = () => {
  const { authUser, loading, authUserType } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!authUser || (authUserType !== "admin" && authUserType !== "practitioner")) {
      router.replace("/401");
      return;
    }
  }, [loading, authUser, authUserType]);

  return (
    <>
      <title>Item Registration</title>
      {!loading ? <CreateItemForm /> : <CustomLoader />}
    </>
  );
};

export default ItemRegistration;
