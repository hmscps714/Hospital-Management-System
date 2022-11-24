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
} from "@devexpress/dx-react-scheduler-material-ui";
import { ViewState } from "@devexpress/dx-react-scheduler";
import { Appointment, Patient } from "src/config/interfaces";
import { getCurrentPatientAppointments, getPatientAppointments } from "src/api/db";
import styles from "./appointments.module.css";
import moment from "moment";
import { CustomLoader } from "../CustomLoader/CustomLoader";

interface AppointmentCalendarPatientProps {
  appointments: Appointment[];
}

export const AppointmentCalendarPatient = (props: AppointmentCalendarPatientProps) => {
  const { appointments } = props;

  const today = new Date(Date.now());

  const [currentDate, setCurrentDate] = useState<Date>(today);

  return (
    <div className={styles.Container}>
      <div className={styles.Card}>
        {appointments ? (
          <Paper>
            <Scheduler data={appointments} height={660}>
              <ViewState currentDate={currentDate} onCurrentDateChange={setCurrentDate} />
              <WeekView startDayHour={9} endDayHour={19} excludedDays={[0, 6]} />

              <Toolbar />
              <DateNavigator />
              <TodayButton />

              <Appointments />
              <AppointmentTooltip showCloseButton />
            </Scheduler>
          </Paper>
        ) : (
          <CustomLoader />
        )}
      </div>
    </div>
  );
};

export default AppointmentCalendarPatient;
