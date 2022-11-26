import { useState, useEffect } from "react";
import { auth } from "src/api/init";
import { userIsPatient, userIsPractitioner, userIsAdmin } from "src/api/auth";

const formatAuthUser = (user) => ({
  uid: user.uid,
  email: user.email,
});

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState(null);
  const [authUserType, setAuthUserType] = useState(null);
  const [loading, setLoading] = useState(true);

  //Async function that handle auth state change (ie log in and log out)
  const authStateChanged = async (authState) => {
    //Determine the user type
    const checkAndUpdateUserType = async () => {
      if (await userIsPatient()) {
        setAuthUserType("patient");
      } else if (await userIsPractitioner()) {
        setAuthUserType("practitioner");
      } else if (await userIsAdmin()) {
        setAuthUserType("admin");
      }
    };

    if (!authState) {
      setAuthUser(null);
      setAuthUserType(null);
      setLoading(false);
      return;
    }

    //if authState changed, perform follow calls:
    setLoading(true);
    var formattedUser = formatAuthUser(authState);
    setAuthUser(formattedUser);
    await checkAndUpdateUserType();
    setLoading(false);
  };

  const clear = () => {
    setLoading(true);
    setAuthUser(null);
    setAuthUserType(null);
  };

  const signOut = () => auth.signOut().then(clear);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authStateChanged);
    return () => unsubscribe();
  }, []);

  return {
    authUser,
    loading,
    authUserType,
    signOut,
  };
}
