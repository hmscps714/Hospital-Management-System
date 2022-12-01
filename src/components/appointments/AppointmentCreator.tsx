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
import { createAppointment, getAllDoctors, getPractitionerAppointments } from "src/api/db";
import styles from "./appointments.module.css";
import { CustomLoader } from "src/components/CustomLoader/CustomLoader";
import AppointmentButton from "./AppointmentButton";
import Button from "@mui/material/Button";

interface AppointmentCreatorProps {
  patient: Patient;
  addPatientAppointment: (appointment: Appointment) => void;
}

export const AppointmentCreator = (props: AppointmentCreatorProps) => {
  const { patient, addPatientAppointment } = props;

  const today = new Date(Date.now());

  const [currentDate, setCurrentDate] = useState<Date>(today);
  const [appointments, setAppointments] = useState<Appointment[]>();

  const [selectedDoctor, setSelectedDoctor] = useState<Practitioner>();
  const [doctorList, setDoctorList] = useState<Practitioner[]>();

  // fetches and removes sensitive data
  const fetchAppointments = () =>
    getPractitionerAppointments(selectedDoctor.uid)
      .then((data) => {
        data.forEach((appointment) => {
          appointment.notes = "";
          appointment.title = "";
        });
        setAppointments(data);
      })
      .catch((e) => console.error(e));

  useEffect(() => {
    if (doctorList === undefined) {
      getAllDoctors()
        .then((data) => setDoctorList(data))
        .catch((e) => console.error(e));
    }
  }, [doctorList]);

  useEffect(() => {
    if (selectedDoctor) {
      fetchAppointments();
    }
  }, [selectedDoctor]);

  const handleAdd = async ({ added }) => {
    if (!added) return;

    const appointment: Appointment = {
      ...added,
      appointmentId: "",
      patientId: patient.uid,
      practitionerId: selectedDoctor.uid,
    };

    await createAppointment(appointment);
    addPatientAppointment(appointment);
    fetchAppointments();

    // reset states
    setDoctorList(undefined);
    setAppointments(undefined);
    setSelectedDoctor(undefined);
  };

  const showAppointmentsList = () => {
    setSelectedDoctor(null);
  };

  return (
    <div className={styles.Container}>
      <div className={styles.Card}>
        <h2>Doctor's appointments</h2>
        {selectedDoctor ? (
          <div>
            <Button onClick={showAppointmentsList} variant="outlined">
              {"<"} Back to list
            </Button>
            <div className={styles.tooltip}>
              Hover me for instructions
              <span className={styles.tooltipText}>
                Double click on any available time slot to create appointment
              </span>
            </div>
          </div>
        ) : (
          <div style={{ height: "36.5px" }}>
            Please select a doctor below to create an appointment
          </div>
        )}
        {
          // pick doctor buttons
          !selectedDoctor && doctorList && (
            <div className={styles.DoctorsList}>
              {doctorList.map((doctor: Practitioner, i) => (
                <AppointmentButton
                  key={i}
                  doctor={doctor}
                  onClick={() => setSelectedDoctor(doctor)}
                />
              ))}
            </div>
          )
        }

        {
          // spinner
          !selectedDoctor && !doctorList && <CustomLoader />
        }
        {
          // appointment picker
          selectedDoctor && appointments && (
            <Paper>
              <Scheduler data={appointments} height={660}>
                {/* <Button onClick={showAppointmentsList} variant="outlined">
                  {"<"} Back to list
                </Button> */}
                <ViewState currentDate={currentDate} onCurrentDateChange={setCurrentDate} />
                <EditingState onCommitChanges={handleAdd} />
                <IntegratedEditing />

                <WeekView startDayHour={9} endDayHour={19} excludedDays={[0, 6]} />

                <Toolbar />
                <DateNavigator />
                <TodayButton />
                <ConfirmationDialog />
                <Appointments />
                <AppointmentTooltip showCloseButton />
                <AppointmentForm />
              </Scheduler>
            </Paper>
          )
        }

        {
          // spinner
          selectedDoctor && !appointments && <CustomLoader />
        }
      </div>
    </div>
  );
};

export default AppointmentCreator;
