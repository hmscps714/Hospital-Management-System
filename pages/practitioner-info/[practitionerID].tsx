import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Practitioner } from "src/config/interfaces";
import { DetailedPractitionerInfo } from "src/components/PractitionerInfo/DetailedPractitionerInfo";
import styles from "./practitioner-info.module.css";
import { CustomLoader } from "src/components/CustomLoader/CustomLoader";
import { getPractitioner } from "src/api/db";
import { useAuth } from "src/context/AuthUserContext";
import Button from "@mui/material/Button";

export const PractitionerInfo = () => {
  const { authUser, loading, authUserType } = useAuth();
  const router = useRouter();
  const { practitionerID } = router.query;
  const [practitioner, setPractitioner] = useState<Practitioner>(null);
  const [err, setErr] = useState<Error>(null);

  useEffect(() => {
    if (loading || !practitionerID) return;
    if (!authUser || authUserType !== "admin") {
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

  return (
    <>
      <title>Practitioner Info</title>
      <h1 className={styles.Title}>Practitioner Information</h1>
      {err && <div className="errorMessage">{err.toString()}</div>}
      {!err && practitioner && !loading ? (
        <div>
          <DetailedPractitionerInfo practitionerData={practitioner} />
          <div style={{ textAlign: "center", marginTop: 50 }}>
            <Button
              variant="contained"
              onClick={() => router.push(`/edit-practitioner/${practitionerID}`)}
            >
              Edit
            </Button>
          </div>
        </div>
      ) : (
        <CustomLoader />
      )}
    </>
  );
};

export default PractitionerInfo;
