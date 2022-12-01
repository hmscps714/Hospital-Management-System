import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Patient } from "src/config/interfaces";
import { DetailedPatientInfo } from "src/components/PatientInfo/DetailedPatientInfo";
import styles from "./patient-info.module.css";
import { getPatient } from "src/api/db";
import { CustomLoader } from "src/components/CustomLoader/CustomLoader";
import { useAuth } from "src/context/AuthUserContext";
import Button from "@mui/material/Button";
import { getPatientAppointments } from "src/api/db";
import { Appointment } from "src/config/interfaces";
import AppointmentCalendarPatient from "src/components/appointments/AppointmentCalendarPatient";
import AppointmentCreator from "src/components/appointments/AppointmentCreator";

export const PatientInfo = () => {
  const { authUser, loading, authUserType } = useAuth();
  const router = useRouter();
  const { patientID } = router.query;
  const [patient, setPatient] = useState<Patient>(null);
  const [err, setErr] = useState<Error>(null);

  // keeps track of patient appointments
  const [patientAppointments, setPatientAppointments] = useState<Appointment[]>();
  const addPatientAppointment = (appointment) =>
    setPatientAppointments([...patientAppointments, appointment]);

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

    getPatientAppointments(patientID as string)
      .then((data) => setPatientAppointments(data))
      .catch((e) => console.error(e));
  }, [loading, authUser, authUserType]);

  return (
    <>
      <title>Patient Info</title>
      <h1 className={styles.Title}>Patient Information</h1>
      <div className={styles.InfoContainer}>
        {err && <div className="errorMessage">{err.toString()}</div>}
        {!err && patient && !loading ? (
          <>
            <DetailedPatientInfo patientData={patient} />
            <div className={styles.Appointment}>
              <AppointmentCalendarPatient appointments={patientAppointments} />
              <AppointmentCreator patient={patient} addPatientAppointment={addPatientAppointment} />
            </div>
            <div style={{ textAlign: "center", marginTop: 50 }}>
              <Button variant="contained" onClick={() => router.push(`/edit-patient/${patientID}`)}>
                Edit
              </Button>
            </div>
          </>
        ) : (
          <CustomLoader />
        )}
      </div>
    </>
  );
};

export default PatientInfo;
