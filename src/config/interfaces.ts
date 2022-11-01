export interface Practitioner {
  basicInformation: {
    firstName: string;
    middleName?: string;
    lastName: string;
    dob: Date;
    healthCardNumber: number;
    gender: string;
    maritalStatus?: string;
    drugAllergies?: string;
    foodAllergies?: string;
  };
  personalContactInformation: {
    email: string;
    password: string;
    phoneNumber: string;
    homeAddress: string;
  };
  emergencyContactInformation: {
    name: string;
    relationshipToPatient: string;
    phoneNumber: string;
    email: string;
  };
  insurance?: {
    memberName?: string;
    providerName?: string;
    planName?: string;
    planNumber?: number;
    planExpiryDate?: Date;
  };
  doctorSpecialty?: string;
}

export interface Patient {
  basicInformation: {
    firstName: string;
    middleName?: string;
    lastName: string;
    dob: Date;
    healthCardNumber: number;
    gender: string;
    maritalStatus?: string;
    drugAllergies?: string;
    foodAllergies?: string;
  };
  personalContactInformation: {
    email: string;
    password: string;
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
  insurance?: {
    memberName?: string;
    providerName?: string;
    planName?: string;
    planNumber?: number;
    planExpiryDate?: Date;
  };
}

export interface Login {
  email: string;
  password: string;
}
