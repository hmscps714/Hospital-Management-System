import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Practitioner } from "src/config/interfaces";
import { DoctorDash } from "src/components/dashboards/DoctorDash";
import { getPractitioner } from "src/api/db";
import { CustomLoader } from "src/components/CustomLoader/CustomLoader";
import { useAuth } from "src/context/AuthUserContext";
import { ButtonList } from "src/components/ButtonList/ButtonList";

export const PractitionerDashboard = () => {
  const router = useRouter();
  const { authUser, loading, authUserType } = useAuth();
  const [practitioner, setPractitioner] = useState<Practitioner>(null);
  const [err, setErr] = useState<Error>(null);

  useEffect(() => {
    if (loading) return;
    if (!authUser || authUserType !== "practitioner") {
      router.replace("/401");
      return;
    }

    getPractitioner(authUser.uid as string)
      .then((p) => setPractitioner(p))
      .catch((e) => {
        console.error(e);
        setErr(e);
      });
  }, [loading, authUser, authUserType]);

  return (
    <>
      {/* <title>Practitioner Dashboard</title> */}
      {/* <ButtonList /> */}
      {err && <div className="errorMessage">{err.toString()}</div>}
      {!err && practitioner && !loading ? (
        <div>
          <DoctorDash doctorData={practitioner} />
        </div>
      ) : (
        <CustomLoader />
      )}
    </>
  );
};

export default PractitionerDashboard;
