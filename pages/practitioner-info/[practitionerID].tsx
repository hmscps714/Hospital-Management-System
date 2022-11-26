import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Practitioner } from "src/config/interfaces";
import { DetailedPractitionerInfo } from "src/components/PractitionerInfo/DetailedPractitionerInfo";
import styles from "./practitioner-info.module.css";
import { CustomLoader } from "src/components/CustomLoader/CustomLoader";
import { getPractitioner } from "src/api/db";
import { useAuth } from "src/context/AuthUserContext";

export const PractitionerInfo = () => {
  const { authUser, loading, authUserType } = useAuth();
  const router = useRouter();
  const { practitionerID } = router.query;
  const [practitioner, setPractitioner] = useState<Practitioner>(null);
  const [err, setErr] = useState<Error>(null);

  useEffect(() => {
    if (loading || !practitionerID) return;
    if (!authUser || authUserType !== "admin") {
      router.push("/401");
      return;
    }
    getPractitioner(practitionerID as string)
      .then((p) => setPractitioner(p))
      .catch((e) => {
        console.error(e);
        setErr(e);
      });
  }, [loading, authUser, authUserType]);

  return (
    <>
      <h1 className={styles.Title}>Practitioner Information</h1>
      {err && <div className="errorMessage">{err.toString()}</div>}
      {!err && practitioner && !loading ? (
        <DetailedPractitionerInfo practitionerData={practitioner}></DetailedPractitionerInfo>
      ) : (
        <CustomLoader />
      )}
    </>
  );
};

export default PractitionerInfo;
