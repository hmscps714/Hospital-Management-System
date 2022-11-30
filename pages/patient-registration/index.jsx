import React, { useEffect } from "react";
import PatientRegisterForm from "src/components/forms/PatientRegisterForm";
import { useAuth } from "src/context/AuthUserContext";
import { useRouter } from "next/router";
import { CustomLoader } from "src/components/CustomLoader/CustomLoader";

export const PatientRegistration = () => {
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
      <title>Patient Registration</title>
      {!loading ? <PatientRegisterForm /> : <CustomLoader />}
    </>
  );
};

export default PatientRegistration;
