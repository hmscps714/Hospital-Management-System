import React from "react";
import { Practitioner } from "src/config/interfaces";
import Button from "@mui/material/Button";

interface AppointmentButtonProps {
  doctor: Practitioner;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export const AppointmentButton = (props: AppointmentButtonProps) => {
  const { doctor, onClick } = props;
  const { firstName, lastName } = doctor.basicInformation;

  return (
    <Button
      variant="outlined"
      disableElevation
      onClick={onClick}
    >{`Dr. ${firstName} ${lastName}`}</Button>
  );
};

export default AppointmentButton;
