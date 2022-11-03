import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "src/api/init";
import { Login, Practitioner, Patient } from "src/config/interfaces";

export const registerPractitioner = async (
  loginObject: Login,
  practitioner: Practitioner
): Promise<boolean> => {
  try {
    const { email, password } = loginObject;

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const { uid } = user;

    await setDoc(doc(db, "practitioner", uid), practitioner);

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

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const registerPatient = async (loginObject: Login, patient: Patient): Promise<boolean> => {
  try {
    const { email, password } = loginObject;

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const { uid } = user;

    await setDoc(doc(db, "patient", uid), patient);

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
