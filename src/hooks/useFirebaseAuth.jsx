import { useState, useEffect } from "react";
import { auth } from "src/api/init";
import { userIsPatient, userIsPractitioner } from "src/api/auth";

const formatAuthUser = (user) => ({
  uid: user.uid,
  email: user.email,
});

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState(null);
  const [authUserType, setAuthUserType] = useState(null);
  const [loading, setLoading] = useState(true);

  const authStateChanged = async (authState) => {
    const checkAndUpdateUserType = async () => {
      // let actualUserType = null;
      if (await userIsPatient()) {
        setAuthUserType("patient");
      } else if (await userIsPractitioner()) {
        setAuthUserType("practitioner");
      }
      // setAuthUserType(actualUserType);
      //TODO admin check
    };

    if (!authState) {
      setAuthUser(null);
      setAuthUserType(null);
      setLoading(false);
      return;
    }
    setLoading(true);

    const data = window.sessionStorage.getItem("AUTH_STATE");
    if (data !== null) {
      console.log("\nAUTH: retrieving state from sessionStorage!\n");
      const converted = JSON.parse(data);
      setAuthUser(converted.authUser);
      setAuthUserType(converted.authUserType);
      // setLoading(converted.loading);
    } else {
      console.log("\nAUTH: retrieving state from firebase!\n");

      var formattedUser = formatAuthUser(authState);
      setAuthUser(formattedUser);
      // window.sessionStorage.setItem("hello", "world");
      await checkAndUpdateUserType();
      // console.log(authUser, authUserType);
      // window.sessionStorage.setItem("AUTH_STATE", JSON.stringify({ authUser, authUserType }));
    }
    setLoading(false);
  };

  const clear = () => {
    setLoading(true);
    setAuthUser(null);
    setAuthUserType(null);
    window.sessionStorage.removeItem("AUTH_STATE");
  };

  //   const signInWithEmailAndPassword = (email, password) =>
  //     auth.signInWithEmailAndPassword(email, password);

  //   const createUserWithEmailAndPassword = (email, password) =>
  //     auth.createUserWithEmailAndPassword(email, password);
  const signOut = () => auth.signOut().then(clear);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authStateChanged);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (authUser && authUserType) {
      window.sessionStorage.setItem("AUTH_STATE", JSON.stringify({ authUser, authUserType }));
    }
  }, [authUser, authUserType]);

  //Once authUser obj is no longer null, determine the user type
  // useEffect(() => {
  //   const checkAndUpdateUserType = async () => {
  //     if (await userIsPatient()) setAuthUserType("patient");
  //     else if (await userIsPractitioner()) setAuthUserType("practitioner");
  //     //TODO admin check
  //   };

  //   if (authUser) checkAndUpdateUserType();
  // }, [authUser]);

  return {
    authUser,
    loading,
    authUserType,
    // signInWithEmailAndPassword,
    // createUserWithEmailAndPassword,
    signOut,
  };
}
