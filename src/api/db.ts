import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "src/api/init";
import {
  Patient,
  Practitioner,
  Prescription,
  InventoryItem,
  InventoryItemUpdate,
  Transaction,
  Appointment,
} from "src/config/interfaces";
import { userIsPatient, userIsPractitioner } from "src/api/auth";
import { v4 as uuidv4 } from "uuid";

export const getPatient = async (uid: string): Promise<Patient | null> => {
  const querySnapshot = await getDoc(doc(db, "patient", uid));

  if (querySnapshot.exists()) return querySnapshot.data() as Patient;
  return Promise.reject(new Error("Patient with the provided uid does not exist in database"));
};

export const getPractitioner = async (uid: string): Promise<Practitioner | null> => {
  const querySnapshot = await getDoc(doc(db, "practitioner", uid));

  if (querySnapshot.exists()) return querySnapshot.data() as Practitioner;
  return Promise.reject(new Error("Practitioner with the provided uid does not exist in database"));
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

  if (!querySnapshot.empty) return querySnapshot.docs.map((doc) => doc.data() as Patient);
  return Promise.reject(new Error("Patients list cannot be retrieved"));
};

export const getAllPractitioners = async (): Promise<Practitioner[]> => {
  const querySnapshot = await getDocs(collection(db, "practitioner"));
  return querySnapshot.docs.map((doc) => doc.data() as Practitioner);
};

export const getAllDoctors = async (): Promise<Practitioner[]> => {
  const q = query(collection(db, "practitioner"), where("fieldSpecialty", "!=", "nurse"));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) return querySnapshot.docs.map((doc) => doc.data() as Practitioner);
  return Promise.reject(new Error("Doctors list cannot be retrieved"));
};

export const getAllNurses = async (): Promise<Practitioner[]> => {
  const q = query(collection(db, "practitioner"), where("fieldSpecialty", "==", "nurse"));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) return querySnapshot.docs.map((doc) => doc.data() as Practitioner);
  return Promise.reject(new Error("Nurses list cannot be retrieved"));
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

export const getAllInventoryItems = async (): Promise<InventoryItem[]> => {
  const querySnapshot = await getDocs(collection(db, "inventory"));
  return querySnapshot.docs.map((doc) => doc.data() as InventoryItem);
};

export const getInventoryItem = async (inventoryId: string): Promise<InventoryItem | null> => {
  const querySnapshot = await getDoc(doc(db, "inventory", inventoryId));
  return querySnapshot.data() as InventoryItem;
};

export const createInventoryItem = async (item: InventoryItem): Promise<boolean> => {
  try {
    const { id } = item;

    const querySnapshot = await getDoc(doc(db, "inventory", id));
    if (querySnapshot.exists()) return false;

    await setDoc(doc(db, "inventory", id), item);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const updateInventoryItem = async (updateObj: InventoryItemUpdate): Promise<boolean> => {
  try {
    const { id, stock } = updateObj;
    await updateDoc(doc(db, "inventory", id), { stock });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getAllTransactions = async (): Promise<Transaction[]> => {
  const querySnapshot = await getDocs(collection(db, "transaction"));
  return querySnapshot.docs.map((doc) => doc.data() as Transaction);
};

export const getTransaction = async (transactionId: string): Promise<Transaction | null> => {
  const querySnapshot = await getDoc(doc(db, "transaction", transactionId));
  return querySnapshot.data() as Transaction;
};

export const createTransaction = async (transaction: Transaction): Promise<boolean> => {
  try {
    const { id } = transaction;

    const querySnapshot = await getDoc(doc(db, "transaction", id));
    if (querySnapshot.exists()) return false;

    await setDoc(doc(db, "transaction", id), transaction);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getPractitionerAppointments = async (uid: string): Promise<Appointment[]> => {
  const q = query(collection(db, "appointment"), where("practitionerId", "==", uid));

  const querySnapshot = await getDocs(q);
  const appointments = querySnapshot.docs.map((doc) => doc.data() as Appointment);
  appointments.forEach((appointment) => {
    // @ts-ignore
    appointment.startDate = new Date(appointment.startDate.seconds * 1000);
    // @ts-ignore
    appointment.endDate = new Date(appointment.endDate.seconds * 1000);
  });

  return appointments;
};

export const getPatientAppointments = async (uid: string): Promise<Appointment[]> => {
  const q = query(collection(db, "appointment"), where("patientId", "==", uid));

  const querySnapshot = await getDocs(q);
  const appointments = querySnapshot.docs.map((doc) => doc.data() as Appointment);
  appointments.forEach((appointment) => {
    // @ts-ignore
    appointment.startDate = new Date(appointment.startDate.seconds * 1000);
    // @ts-ignore
    appointment.endDate = new Date(appointment.endDate.seconds * 1000);
  });

  return appointments;
};

export const getCurrentPractitionerAppointments = async (): Promise<Appointment[]> => {
  const user = auth.currentUser;

  if (user === null) return null;

  return await getPractitionerAppointments(user.uid);
};

export const getCurrentPatientAppointments = async (): Promise<Appointment[]> => {
  const user = auth.currentUser;

  if (user === null) return null;

  return await getPatientAppointments(user.uid);
};

export const createAppointment = async (appointment: Appointment): Promise<boolean> => {
  if (!userIsPatient()) return false;

  try {
    const uid = uuidv4();
    appointment.appointmentId = uid;

    await setDoc(doc(db, "appointment", uid), appointment);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const updatePatient = async (patient: Patient): Promise<boolean> => {
  try {
    const { uid } = patient;

    await setDoc(doc(db, "patient", uid), patient);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const updatePractitioner = async (practitioner: Practitioner): Promise<boolean> => {
  try {
    const { uid } = practitioner;

    await setDoc(doc(db, "practitioner", uid), practitioner);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const deleteInventoryItem = async (inventoryItemId: string): Promise<boolean> => {
  try {
    await deleteDoc(doc(db, "inventory", inventoryItemId));
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const deleteTransactionItem = async (transactionItemId: string): Promise<boolean> => {
  try {
    await deleteDoc(doc(db, "transaction", transactionItemId));
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
