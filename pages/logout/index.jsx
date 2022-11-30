import React, { useEffect } from "react";
import { useAuth } from "src/context/AuthUserContext";
import { useRouter } from "next/router";
import { CustomLoader } from "src/components/CustomLoader/CustomLoader";

export const Logout = () => {
  const router = useRouter();
  const { authUser, loading, signOut } = useAuth();

  useEffect(() => {
    const accountSignOut = async () => {
      await signOut();
    };
    if (!loading && authUser) {
      //User currently logged in
      console.log("signing out!!");
      accountSignOut();
    }

    if (!loading && !authUser) {
      router.push("/login");
    }
  }, [authUser, loading]);

  return (
    <>
      <title>Logout</title>
      <CustomLoader />
    </>
  );
};

export default Logout;
