import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import {
  Scheduler,
  WeekView,
  Appointments,
  AppointmentTooltip,
  AppointmentForm,
  DateNavigator,
  TodayButton,
  Toolbar,
  ConfirmationDialog,
} from "@devexpress/dx-react-scheduler-material-ui";
import { ViewState, EditingState, IntegratedEditing } from "@devexpress/dx-react-scheduler";
import { Appointment, Patient, Practitioner } from "src/config/interfaces";
import { createAppointment, getAllPatients, getPatientAppointments } from "src/api/db";
import styles from "./appointments.module.css";
import { CustomLoader } from "src/components/CustomLoader/CustomLoader";
import AppointmentButton from "./AppointmentButtonPat";
import Button from "@mui/material/Button";
import { patient } from "src/config/dummy";

// interface AppointmentCreatorProps {
//   patient: Patient;
//   addPatientAppointment: (appointment: Appointment) => void;
// }

export const AppointmentAdminPat = () => {
  // const { patient, addPatientAppointment } = props;

  const today = new Date(Date.now());

  const [currentDate, setCurrentDate] = useState<Date>(today);
  const [appointments, setAppointments] = useState<Appointment[]>();

  const [selectedPatient, setSelectedPatient] = useState<Patient>();
  const [patientList, setPatientList] = useState<Patient[]>();

  // fetches and removes sensitive data
  const fetchAppointments = () =>
    getPatientAppointments(selectedPatient.uid)
      .then((data) => {
        data.forEach((appointment) => {
          // appointment.notes;
          // appointment.title;
        });
        setAppointments(data);
      })
      .catch((e) => console.error(e));

  useEffect(() => {
    if (patientList === undefined) {
      getAllPatients()
        .then((data) => setPatientList(data))
        .catch((e) => console.error(e));
    }
  }, [patientList]);

  useEffect(() => {
    if (selectedPatient) {
      fetchAppointments();
    }
  }, [selectedPatient]);

  // const handleAdd = async ({ added }) => {
  //   if (!added) return;

  //   const appointment: Appointment = {
  //     ...added,
  //     appointmentId: "",
  //     patientId: selectedPatient.uid,
  //     // practitionerId: selectedDoctor.uid,
  //   };

  //   await createAppointment(appointment);
  //   // addPatientAppointment(appointment);
  //   fetchAppointments();

  //   // reset states
  //   setPatientList(undefined);
  //   setAppointments(undefined);
  //   setSelectedPatient(undefined);
  // };

  const showAppointmentsList = () => {
    setSelectedPatient(null);
  };

  return (
    <div className={styles.Container}>
      <div className={styles.Card}>
        <h2>Patient's appointments</h2>
        {selectedPatient ? (
          <div>
            <Button onClick={showAppointmentsList} variant="outlined">
              {"<"} Back to list
            </Button>
          </div>
        ) : (
          <div style={{ height: "36.5px" }}>
            Please select a patient below to see their appointments
          </div>
        )}
        {
          // pick doctor buttons
          !selectedPatient && patientList && (
            <div className={styles.DoctorsList}>
              {patientList.map((patient: Patient, i) => (
                <AppointmentButton
                  key={i}
                  patient={patient}
                  onClick={() => setSelectedPatient(patient)}
                />
              ))}
            </div>
          )
        }

        {
          // spinner
          !selectedPatient && !patientList && <CustomLoader />
        }

        {
          // appointment picker
          selectedPatient && appointments && (
            <Paper>
              <Scheduler data={appointments} height={660}>
                <ViewState currentDate={currentDate} onCurrentDateChange={setCurrentDate} />
                {/* <EditingState onCommitChanges={handleAdd} /> */}
                {/* <IntegratedEditing /> */}

                <WeekView startDayHour={9} endDayHour={19} excludedDays={[0, 6]} />

                <Toolbar />
                <DateNavigator />
                <TodayButton />
                {/* <ConfirmationDialog /> */}

                <Appointments />
                <AppointmentTooltip showCloseButton />
                {/* <AppointmentForm />} */}
              </Scheduler>
            </Paper>
          )
        }

        {
          // spinner
          selectedPatient && !appointments && <CustomLoader />
        }
      </div>
    </div>
  );
};

export default AppointmentAdminPat;
