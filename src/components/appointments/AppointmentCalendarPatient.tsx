import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import {
  Scheduler,
  WeekView,
  Appointments,
  AppointmentTooltip,
  DateNavigator,
  TodayButton,
  Toolbar,
} from "@devexpress/dx-react-scheduler-material-ui";
import { ViewState } from "@devexpress/dx-react-scheduler";
import { Appointment } from "src/config/interfaces";
import styles from "./appointments.module.css";
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
        <h2>My appointments</h2>
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
