import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Patient } from "src/config/interfaces";
import styles from "./edit-patient.module.css";
import { getPatient } from "src/api/db";
import { CustomLoader } from "src/components/CustomLoader/CustomLoader";
import { useAuth } from "src/context/AuthUserContext";
import PatientEditForm from "src/components/forms/PatientEditForm";
import moment from "moment";

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

  // maps Patient to our forms object
  const formValsDefault =
    patient === null
      ? {}
      : {
          firstName: patient.basicInformation.firstName,
          lastName: patient.basicInformation.lastName,
          // @ts-ignore
          dob: moment(new Date(patient.basicInformation.dob.seconds * 1000))
            .format("YYYY-MM-DD")
            .toString(),
          healthCardNumber: patient.basicInformation.healthCardNumber,
          gender: patient.basicInformation.gender,
          email: patient.personalContactInformation.email,
          phoneNumber: patient.personalContactInformation.phoneNumber,
          homeAddress: patient.personalContactInformation.homeAddress,
          //Emergency contact below
          eName: patient.emergencyContactInformation.name,
          relationshipToPatient: patient.emergencyContactInformation.relationshipToPatient,
          ePhone: patient.emergencyContactInformation.phoneNumber,
          eEmail: patient.emergencyContactInformation.email,
          //Physician info
          physicianName: patient?.physicianInformation?.physicianName,
          clinicName: patient?.physicianInformation?.clinicName,
          clinicAddress: patient?.physicianInformation?.clinicAddress,
          clinicPhone: patient?.physicianInformation?.clinicPhone,
          clinicEmail: patient?.physicianInformation?.clinicEmail,
          //Pharmacy info
          pName: patient?.pharmacy?.name,
          pPhone: patient?.pharmacy?.phone,
          fax: patient?.pharmacy?.fax,
          pEmail: patient?.pharmacy?.email,
          pAddress: patient?.pharmacy?.address,
          uid: patient?.uid,
        };

  return (
    <>
      <h1 className={styles.Title}>Patient Information Edit Form</h1>
      {err && <div className="errorMessage">{err.toString()}</div>}
      {!err && patient && !loading ? (
        <PatientEditForm formValsDefault={formValsDefault} />
      ) : (
        <CustomLoader />
      )}
    </>
  );
};

export default PatientInfo;
