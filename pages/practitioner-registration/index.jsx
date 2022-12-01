import React, { useEffect } from "react";
import PractitionerRegisterForm from "src/components/forms/PractitionerRegisterForm";
import { useAuth } from "src/context/AuthUserContext";
import { useRouter } from "next/router";
import { CustomLoader } from "src/components/CustomLoader/CustomLoader";

export const PractitionerRegistration = () => {
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
      <title>Practitioner Registration</title>
      {!loading ? <PractitionerRegisterForm /> : <CustomLoader />}
    </>
  );
};

export default PractitionerRegistration;
