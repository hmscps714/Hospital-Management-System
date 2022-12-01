import React from "react";
import { Patient } from "src/config/interfaces";
import Button from "@mui/material/Button";

interface AppointmentButtonProps {
  patient: Patient;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export const AppointmentButton = (props: AppointmentButtonProps) => {
  const { patient, onClick } = props;
  const { firstName, lastName } = patient.basicInformation;

  return (
    <Button
      variant="outlined"
      disableElevation
      onClick={onClick}
    >{`${firstName} ${lastName}`}</Button>
  );
};

export default AppointmentButton;
