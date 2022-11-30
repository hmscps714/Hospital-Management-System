import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Patient } from "src/config/interfaces";
import { DetailedPatientInfo } from "src/components/PatientInfo/DetailedPatientInfo";
import styles from "./patient-info.module.css";
import { getPatient } from "src/api/db";
import { CustomLoader } from "src/components/CustomLoader/CustomLoader";
import { useAuth } from "src/context/AuthUserContext";
import { getPatientAppointments } from "src/api/db";
import { Appointment } from "src/config/interfaces";
import AppointmentCalendarPatient from "src/components/appointments/AppointmentCalendarPatient";

export const PatientInfo = () => {
  const { authUser, loading, authUserType } = useAuth();
  const router = useRouter();
  const { patientID } = router.query;
  const [patient, setPatient] = useState<Patient>(null);
  const [err, setErr] = useState<Error>(null);

  // keeps track of patient appointments
  const [patientAppointments, setPatientAppointments] = useState<Appointment[]>();

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

  useEffect(() => {
    if (loading || !patientID) return;
    if (patientAppointments === undefined) {
      getPatientAppointments(patientID as string)
        .then((data) => setPatientAppointments(data))
        .catch((e) => console.error(e));
    }
  }, [patientAppointments]);

  return (
    <>
      <title>Patient Info</title>
      <h1 className={styles.Title}>Patient Information</h1>
      {err && <div className="errorMessage">{err.toString()}</div>}
      {!err && patient && !loading ? (
        <div>
          <DetailedPatientInfo patientData={patient} />
        </div>
      ) : (
        <CustomLoader />
      )}
      <div className={styles.Appointment}>
        <AppointmentCalendarPatient appointments={patientAppointments} />
      </div>
    </>
  );
};

export default PatientInfo;
