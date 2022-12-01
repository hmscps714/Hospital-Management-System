import React, { useState, useEffect } from "react";
import Table from "src/components/Tables/Table";
import { getAllDoctors } from "src/api/db";
import { CustomLoader } from "src/components/CustomLoader/CustomLoader";
import { useAuth } from "src/context/AuthUserContext";
import { useRouter } from "next/router";

export const DoctorsList = () => {
  const { authUser, loading, authUserType } = useAuth();
  const router = useRouter();
  const [doctorsList, setDoctorsList] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    if (loading) return;
    if (!authUser || authUserType !== "admin") {
      router.replace("/401");
      return;
    }
    getAllDoctors()
      .then((x) => {
        setDoctorsList(x);
      })
      .catch((e) => {
        console.error(e);
        setErr(e);
      });
  }, [loading, authUser, authUserType]);

  const extractInfo = () => {
    const getName = (doctorData) => {
      const basicInfo = doctorData["basicInformation"];
      return basicInfo["firstName"] + " " + basicInfo["lastName"];
    };

    const getEmail = (doctorData) => {
      return doctorData["personalContactInformation"]["email"];
    };

    const getPhone = (doctorData) => {
      return doctorData["personalContactInformation"]["phoneNumber"];
    };

    const getUID = (doctorData) => {
      return doctorData["uid"];
    };

    return doctorsList.map((p) => {
      const doctorObj = {
        name: getName(p),
        email: getEmail(p),
        phone: getPhone(p),
        uid: getUID(p),
      };
      return doctorObj;
    });
  };

  return (
    <>
      <title>Doctors List</title>
      {err && <div className="errorMessage">{err.toString()}</div>}
      {!err && doctorsList && !loading ? (
        <Table
          buttonLabel={"Add Doctor"}
          tableData={extractInfo()}
          routePath={"/practitioner-info/"}
          tableHeadings={"Doctors List"}
          buttonRoutePath={"/practitioner-registration"}
        />
      ) : (
        <CustomLoader />
      )}
    </>
  );
};

export default DoctorsList;
