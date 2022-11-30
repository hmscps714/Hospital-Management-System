import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { CustomLoader } from "src/components/CustomLoader/CustomLoader";
import { useAuth } from "src/context/AuthUserContext";
import { ButtonList } from "src/components/ButtonList/ButtonList";

export const AdminDashboard = () => {
  const { authUser, loading, authUserType } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!authUser || authUserType !== "admin") {
      router.replace("/401");
      return;
    }
  }, [loading, authUser, authUserType]);

  return (
    <>
      {loading && <CustomLoader />}
      {!loading && (
        <div>
          <h1>Admin dashboard</h1>
          <ButtonList />
        </div>
      )}
    </>
  );
};

export default AdminDashboard;
