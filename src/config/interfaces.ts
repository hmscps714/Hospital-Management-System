export interface Practitioner {
  basicInformation: {
    firstName: string;
    // middleName?: string;
    lastName: string;
    dob: Date;
    healthCardNumber: number;
    gender: string;
    // maritalStatus?: string;
    // drugAllergies?: string;
    // foodAllergies?: string;
  };
  personalContactInformation: {
    email: string;
    phoneNumber: string;
    homeAddress: string;
  };
  emergencyContactInformation: {
    name: string;
    relationshipToPatient: string;
    phoneNumber: string;
    email: string;
  };
  // insurance?: {
  //   memberName?: string;
  //   providerName?: string;
  //   planName?: string;
  //   planNumber?: number;
  //   planExpiryDate?: Date;
  // };
  fieldSpecialty: string;
  uid?: string;
}

export interface Patient {
  basicInformation: {
    firstName: string;
    // middleName?: string;
    lastName: string;
    dob: Date;
    healthCardNumber: number;
    gender: string;
    // maritalStatus?: string;
    // drugAllergies?: string;
    // foodAllergies?: string;
  };
  personalContactInformation: {
    email: string;
    phoneNumber: string;
    homeAddress: string;
  };
  emergencyContactInformation: {
    name: string;
    relationshipToPatient: string;
    phoneNumber: string;
    email: string;
  };
  physicianInformation: {
    physicianName: string;
    clinicName: string;
    clinicAddress: string;
    clinicPhone: string;
    clinicEmail?: string;
  };
  pharmacy?: {
    name?: string;
    phone?: string;
    fax?: string;
    email?: string;
    address?: string;
  };
  // insurance?: {
  //   memberName?: string;
  //   providerName?: string;
  //   planName?: string;
  //   planNumber?: number;
  //   planExpiryDate?: Date;
  // };
  uid?: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface InventoryItem {
  name: string;
  stock: number;
  id: string;
  price: number;
}

export interface Prescription {
  patientId: string;
  practitionerId: string;
  name: string;
  quantity: number;
  timestamp: Date;
}

export interface InventoryItemUpdate {
  id: string;
  stock: number;
}

export interface Transaction {
  id: string;
  type: string;
  name: string;
  amount: number;
  date: Date;
}

export interface Appointment {
  title: string;
  startDate: Date;
  endDate: Date;
  appointmentId: string;
  practitionerId: string;
  patientId: string;
  allDay?: boolean;
  notes?: string;
}
