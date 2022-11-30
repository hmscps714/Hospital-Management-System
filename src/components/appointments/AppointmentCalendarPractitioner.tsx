import React, { useEffect, useState } from "react";
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
import { getCurrentPractitionerAppointments } from "src/api/db";
import styles from "./appointments.module.css";
import { CustomLoader } from "../CustomLoader/CustomLoader";
import { Appointment } from "src/config/interfaces";

export const AppointmentCalendarPractitioner = () => {
  const today = new Date(Date.now());

  const [currentDate, setCurrentDate] = useState<Date>(today);
  const [appointments, setAppointments] = useState<Appointment[]>(null);

  useEffect(() => {
    if (appointments === null) {
      getCurrentPractitionerAppointments()
        .then((data) => setAppointments(data))
        .catch((e) => console.error(e));
    }
  }, [appointments]);

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

export default AppointmentCalendarPractitioner;
