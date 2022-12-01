import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Patient } from "src/config/interfaces";
import { PatientDash } from "src/components/dashboards/PatientDash";
import { getPatient } from "src/api/db";
import { CustomLoader } from "src/components/CustomLoader/CustomLoader";
import { useAuth } from "src/context/AuthUserContext";
import { ButtonList } from "src/components/ButtonList/ButtonList";

export const PatientDashBoard = () => {
  const { authUser, loading, authUserType } = useAuth();
  const router = useRouter();
  const [patient, setPatient] = useState<Patient>(null);
  const [err, setErr] = useState<Error>(null);

  useEffect(() => {
    if (loading) return;
    if (!authUser || authUserType !== "patient") {
      router.replace("/401");
      return;
    }

    getPatient(authUser.uid as string)
      .then((p) => setPatient(p))
      .catch((e) => {
        console.error(e);
        setErr(e);
      });
  }, [loading, authUser, authUserType]);

  return (
    <>
      {/* <title>Patient Dashboard</title>
      <ButtonList /> */}
      {err && <div className="errorMessage">{err.toString()}</div>}
      {!err && patient && !loading ? (
        <div>
          <PatientDash patientData={patient} />
        </div>
      ) : (
        <CustomLoader />
      )}
    </>
  );
};

export default PatientDashBoard;
