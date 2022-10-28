import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "src/api/init";

export const registerPractitioner = async (
  email: string,
  password: string,
  name: string,
  role: string
): Promise<boolean> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const { uid } = user;

    await setDoc(doc(db, "practitioner", uid), {
      name,
      role,
    });

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const signInPractitioner = async (email: string, password: string): Promise<boolean> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
