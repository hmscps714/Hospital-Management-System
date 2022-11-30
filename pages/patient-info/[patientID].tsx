import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Patient } from "src/config/interfaces";
import { DetailedPatientInfo } from "src/components/PatientInfo/DetailedPatientInfo";
import styles from "./patient-info.module.css";
import { getPatient } from "src/api/db";
import { CustomLoader } from "src/components/CustomLoader/CustomLoader";
import { useAuth } from "src/context/AuthUserContext";

export const PatientInfo = () => {
  const { authUser, loading, authUserType } = useAuth();
  const router = useRouter();
  const { patientID } = router.query;
  const [patient, setPatient] = useState<Patient>(null);
  const [err, setErr] = useState<Error>(null);

  useEffect(() => {
    if (loading || !patientID) return;
    if (!authUser || (authUserType !== "admin" && authUserType !== "practitioner")) {
      router.replace("/401");
      return;
    }
    getPatient(patientID as string)
      .then((p) => setPatient(p))
      .catch((e) => {
        console.error(e);
        setErr(e);
      });
  }, [loading, authUser, authUserType]);

  return (
    <>
      <h1 className={styles.Title}>Patient Information</h1>
      {err && <div className="errorMessage">{err.toString()}</div>}
      {!err && patient && !loading ? (
        <div>
          <DetailedPatientInfo patientData={patient} />
        </div>
      ) : (
        <CustomLoader />
      )}
    </>
  );
};

export default PatientInfo;
