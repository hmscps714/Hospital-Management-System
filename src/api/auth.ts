import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db, secondaryAuth } from "src/api/init";
import { Login, Practitioner, Patient } from "src/config/interfaces";

export const registerPractitioner = async (
  loginObject: Login,
  practitioner: Practitioner
): Promise<boolean> => {
  try {
    const { email, password } = loginObject;

    const userCredential = await createUserWithEmailAndPassword(secondaryAuth, email, password);
    const user = userCredential.user;
    const { uid } = user;

    practitioner.uid = uid;

    await setDoc(doc(db, "practitioner", uid), practitioner);
    await signOut(secondaryAuth);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const signInPractitioner = async (loginObject: Login): Promise<boolean> => {
  try {
    const { email, password } = loginObject;
    await signInWithEmailAndPassword(auth, email, password);

    if (!(await userIsPractitioner())) {
      await signOutUser();
      return false;
    }

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const registerPatient = async (loginObject: Login, patient: Patient): Promise<boolean> => {
  try {
    const { email, password } = loginObject;

    const userCredential = await createUserWithEmailAndPassword(secondaryAuth, email, password);
    const user = userCredential.user;
    const { uid } = user;

    patient.uid = uid;

    await setDoc(doc(db, "patient", uid), patient);
    await signOut(secondaryAuth); //Sign out to prevent potential auth issues
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const signInPatient = async (loginObject: Login): Promise<boolean> => {
  try {
    const { email, password } = loginObject;
    await signInWithEmailAndPassword(auth, email, password);

    if (!(await userIsPatient())) {
      await signOutUser();
      return false;
    }

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const signOutUser = async (): Promise<boolean> => {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const userIsPatient = async (): Promise<boolean> => {
  const user = auth.currentUser;

  if (user === null) return false;

  const querySnapshot = await getDoc(doc(db, "patient", user.uid));
  return querySnapshot.exists();
};

export const userIsPractitioner = async (): Promise<boolean> => {
  const user = auth.currentUser;

  if (user === null) return false;

  const querySnapshot = await getDoc(doc(db, "practitioner", user.uid));
  return querySnapshot.exists();
};

export const getCurrentUserId = (): string | null => {
  const user = auth.currentUser;

  if (user === null) return null;

  return user.uid;
};

export const signInUser = async (loginObject: Login): Promise<boolean> => {
  try {
    const { email, password } = loginObject;
    await signInWithEmailAndPassword(auth, email, password);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const userIsAdmin = async (): Promise<boolean> => {
  const user = auth.currentUser;

  if (user === null) return false;

  const querySnapshot = await getDoc(doc(db, "admin", user.uid));
  return querySnapshot.exists();
};

export const signInAdmin = async (loginObject: Login): Promise<boolean> => {
  try {
    const { email, password } = loginObject;
    await signInWithEmailAndPassword(auth, email, password);

    if (!(await userIsAdmin())) {
      await signOutUser();
      return false;
    }

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const sendPasswordResetEmailToUser = async (email: string): Promise<boolean> => {
  try {
    await sendPasswordResetEmail(auth, email);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};
