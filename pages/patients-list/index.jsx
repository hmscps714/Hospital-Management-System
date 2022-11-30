import React, { useState, useEffect } from "react";
import Table from "src/components/Tables/Table";
import { getAllPatients } from "src/api/db";
import { CustomLoader } from "src/components/CustomLoader/CustomLoader";
import { useAuth } from "src/context/AuthUserContext";
import { useRouter } from "next/router";

export const PatientList = () => {
  const { authUser, loading, authUserType } = useAuth();
  const router = useRouter();
  const [patientList, setPatientList] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    if (loading) return;
    if (!authUser || (authUserType !== "admin" && authUserType !== "practitioner")) {
      router.replace("/401");
      return;
    }
    getAllPatients()
      .then((x) => setPatientList(x))
      .catch((e) => {
        console.error(e);
        setErr(e);
      });
  }, [loading, authUser, authUserType]);

  const extractInfo = () => {
    const getName = (patientData) => {
      const basicInfo = patientData["basicInformation"];
      return basicInfo["firstName"] + " " + basicInfo["lastName"];
    };

    const getEmail = (patientData) => {
      return patientData["personalContactInformation"]["email"];
    };

    const getPhone = (patientData) => {
      return patientData["personalContactInformation"]["phoneNumber"];
    };

    const getUID = (patientData) => {
      return patientData["uid"];
    };

    return patientList.map((p) => {
      const patientObj = {
        name: getName(p),
        email: getEmail(p),
        phone: getPhone(p),
        uid: getUID(p),
      };
      return patientObj;
    });
  };

  return (
    <>
      <title>Patients List</title>
      {err && <div className="errorMessage">{err.toString()}</div>}
      {!err && patientList && !loading ? (
        <Table
          buttonLabel={"Add Patient"}
          tableData={extractInfo()}
          routePath={"/patient-info/"}
          tableHeadings={"Patients List"}
          buttonRoutePath={"/patient-registration"}
        />
      ) : (
        <CustomLoader />
      )}
    </>
  );
};

export default PatientList;
