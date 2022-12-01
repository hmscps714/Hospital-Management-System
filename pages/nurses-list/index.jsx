import React, { useState, useEffect } from "react";
import Table from "src/components/Tables/Table";
import { getAllNurses } from "src/api/db";
import { CustomLoader } from "src/components/CustomLoader/CustomLoader";
import { useAuth } from "src/context/AuthUserContext";
import { useRouter } from "next/router";

export const NursesList = () => {
  const { authUser, loading, authUserType } = useAuth();
  const router = useRouter();
  const [nursesList, setNursesList] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    if (loading) return;
    if (!authUser || authUserType !== "admin") {
      router.replace("/401");
      return;
    }
    getAllNurses()
      .then((x) => {
        setNursesList(x);
      })
      .catch((e) => {
        console.error(e);
        setErr(e);
      });
  }, [loading, authUser, authUserType]);

  const extractInfo = () => {
    const getName = (nurseData) => {
      const basicInfo = nurseData["basicInformation"];
      return basicInfo["firstName"] + " " + basicInfo["lastName"];
    };

    const getEmail = (nurseData) => {
      return nurseData["personalContactInformation"]["email"];
    };

    const getPhone = (nurseData) => {
      return nurseData["personalContactInformation"]["phoneNumber"];
    };

    const getUID = (nurseData) => {
      return nurseData["uid"];
    };

    return nursesList.map((p) => {
      const nurseObj = {
        name: getName(p),
        email: getEmail(p),
        phone: getPhone(p),
        uid: getUID(p),
      };
      return nurseObj;
    });
  };

  return (
    <>
      <title>Nurses List</title>
      {err && <div className="errorMessage">{err.toString()}</div>}
      {!err && nursesList && !loading ? (
        <Table
          buttonLabel={"Add Nurse"}
          tableData={extractInfo()}
          routePath={"/practitioner-info/"}
          tableHeadings={"Nurses List"}
          buttonRoutePath={"/practitioner-registration"}
        />
      ) : (
        <CustomLoader />
      )}
    </>
  );
};

export default NursesList;
