import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "src/api/init";
import { Patient, Practitioner } from "src/config/interfaces";

export const getPatient = async (uid: string): Promise<Patient | null> => {
  const querySnapshot = await getDoc(doc(db, "patient", uid));
  return querySnapshot.data() as Patient;
};

export const getPractitioner = async (uid: string): Promise<Practitioner | null> => {
  const querySnapshot = await getDoc(doc(db, "practitioner", uid));
  return querySnapshot.data() as Practitioner;
};

export const getCurrentPatient = async (): Promise<Patient | null> => {
  const user = auth.currentUser;

  if (user === null) return null;

  return await getPatient(user.uid);
};

export const getCurrentPractitioner = async (): Promise<Practitioner | null> => {
  const user = auth.currentUser;

  if (user === null) return null;

  return await getPractitioner(user.uid);
};

export const getAllPatients = async (): Promise<Patient[]> => {
  const querySnapshot = await getDocs(collection(db, "patient"));
  return querySnapshot.docs.map((doc) => doc.data() as Patient);
};

export const getAllPractitioners = async (): Promise<Practitioner[]> => {
  const querySnapshot = await getDocs(collection(db, "practitioner"));
  return querySnapshot.docs.map((doc) => doc.data() as Practitioner);
};

export const getAllDoctors = async (): Promise<Practitioner[]> => {
  const q = query(collection(db, "practitioner"), where("fieldSpecialty", "!=", "nurse"));

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => doc.data() as Practitioner);
};

export const getAllNurses = async (): Promise<Practitioner[]> => {
  const q = query(collection(db, "practitioner"), where("fieldSpecialty", "==", "nurse"));

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => doc.data() as Practitioner);
};
