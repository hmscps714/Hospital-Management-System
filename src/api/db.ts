import { collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import { auth, db } from "src/api/init";
import { Patient, Practitioner, Prescription } from "src/config/interfaces";
import { userIsPractitioner } from "src/api/auth";

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

export const makePrescription = async (prescription: Prescription): Promise<boolean> => {
  try {
    if (!(await userIsPractitioner())) return false;

    const documentName = prescription.patientId + "_" + prescription.timestamp.toJSON();
    await setDoc(doc(db, "prescriptions", documentName), prescription);
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getPatientsPrescriptions = async (uid: string): Promise<Prescription[]> => {
  const q = query(collection(db, "prescriptions"), where("patientId", "==", uid));

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => doc.data() as Prescription);
};

export const getPractitionersPrescriptions = async (uid: string): Promise<Prescription[]> => {
  const q = query(collection(db, "prescriptions"), where("practitionerId", "==", uid));

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => doc.data() as Prescription);
};

export const getCurrentPatientsPrescriptions = async (): Promise<Prescription[]> => {
  const user = auth.currentUser;

  if (user === null) return null;

  return await getPatientsPrescriptions(user.uid);
};

export const getCurrentPractitionersPrescriptions = async (): Promise<Prescription[]> => {
  const user = auth.currentUser;

  if (user === null) return null;

  return await getPractitionersPrescriptions(user.uid);
};
