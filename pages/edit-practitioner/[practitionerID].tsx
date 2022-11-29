import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Practitioner } from "src/config/interfaces";
import styles from "./edit-practitioner.module.css";
import { getPractitioner } from "src/api/db";
import { CustomLoader } from "src/components/CustomLoader/CustomLoader";
import { useAuth } from "src/context/AuthUserContext";
import PractitionerEditForm from "src/components/forms/PractitionerEditForm";
import moment from "moment";

export const PractitionerInfo = () => {
  const { authUser, loading, authUserType } = useAuth();

  const router = useRouter();
  const { practitionerID } = router.query;

  const [practitioner, setPractitioner] = useState<Practitioner>(null);
  const [err, setErr] = useState<Error>(null);

  useEffect(() => {
    if (loading || !practitionerID) return;
    if (!authUser || (authUserType !== "admin" && authUserType !== "practitioner")) {
      router.replace("/401");
      return;
    }
    getPractitioner(practitionerID as string)
      .then((p) => setPractitioner(p))
      .catch((e) => {
        console.error(e);
        setErr(e);
      });
  }, [loading, authUser, authUserType]);

  // maps Practitioner to our forms object
  const formValsDefault =
    practitioner === null
      ? {}
      : {
          firstName: practitioner.basicInformation.firstName,
          lastName: practitioner.basicInformation.lastName,
          // @ts-ignore
          dob: moment(new Date(practitioner.basicInformation.dob.seconds * 1000))
            .format("YYYY-MM-DD")
            .toString(),
          healthCardNumber: practitioner.basicInformation.healthCardNumber,
          gender: practitioner.basicInformation.gender,
          email: practitioner.personalContactInformation.email,
          phoneNumber: practitioner.personalContactInformation.phoneNumber,
          homeAddress: practitioner.personalContactInformation.homeAddress,
          //Emergency contact below
          eName: practitioner?.emergencyContactInformation?.name,
          relationshipToPatient: practitioner?.emergencyContactInformation?.relationshipToPatient,
          ePhone: practitioner?.emergencyContactInformation?.phoneNumber,
          eEmail: practitioner?.emergencyContactInformation?.email,
          fieldSpecialty: practitioner.fieldSpecialty,
          uid: practitioner.uid,
        };

  return (
    <>
      <h1 className={styles.Title}>Practitioner Information Edit Form</h1>
      {err && <div className="errorMessage">{err.toString()}</div>}
      {!err && practitioner && !loading ? (
        <PractitionerEditForm formValsDefault={formValsDefault} />
      ) : (
        <CustomLoader />
      )}
    </>
  );
};

export default PractitionerInfo;
