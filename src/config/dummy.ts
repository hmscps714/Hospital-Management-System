import { Patient, Practitioner } from "./interfaces";

export const patient: Patient = {
  basicInformation: {
    firstName: "bob",
    lastName: "smith",
    dob: new Date("12/24/2000"),
    healthCardNumber: 1234,
    gender: "male",
  },
  personalContactInformation: {
    email: "bobsmith@test.com",
    phoneNumber: "123-456-7890",
    homeAddress: "350 victoria st",
  },
  emergencyContactInformation: {
    name: "john",
    relationshipToPatient: "sugar daddy",
    phoneNumber: "911",
    email: "john@pornhub.com",
  },
  physicianInformation: {
    physicianName: "johnny sins",
    clinicName: "redtube",
    clinicAddress: "idk",
    clinicPhone: "987-654-3210",
  },
};

export const patient2: Patient = {
  basicInformation: {
    firstName: "jared",
    lastName: "fogle",
    dob: new Date("04/20/1969"),
    healthCardNumber: 4321,
    gender: "male",
  },
  personalContactInformation: {
    email: "jaredfogle@subway.com",
    phoneNumber: "416-967-1111",
    homeAddress: "prison",
  },
  emergencyContactInformation: {
    name: "bill",
    relationshipToPatient: "subway PR manager",
    phoneNumber: "2",
    email: "publicrelations@subway.com",
  },
  physicianInformation: {
    physicianName: "ronald",
    clinicName: "mcdonalds",
    clinicAddress: "idk",
    clinicPhone: "123-123-1234",
  },
};
