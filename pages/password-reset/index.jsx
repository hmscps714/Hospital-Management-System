import React, { useEffect } from "react";
import PasswordResetForm from "../../src/components/forms/PasswordResetForm";
import { useAuth } from "src/context/AuthUserContext";
import { useRouter } from "next/router";
import { CustomLoader } from "src/components/CustomLoader/CustomLoader";

const PasswordReset = () => {
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
      <title>Password Reset</title>
      {!loading ? <PasswordResetForm /> : <CustomLoader />}
    </>
  );
};

export default PasswordReset;
