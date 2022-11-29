import React from "react";
import { useRouter } from "next/router";
import styles from "./ButtonList.module.css";

export const ButtonList = () => {
  const router = useRouter();
  const routeList = [
    //Dash pages
    "/admin-dashboard",
    "/practitioner-dashboard",
    "/patient-dashboard",

    //Table pages
    "/patients-list",
    "/doctors-list",
    "/nurses-list",
    "/financial",
    "/inventory-list",

    //Detail pages
    "/patient-info/KW1mLcpUbgQ669yxr6euotqCiKH3",
    "/practitioner-info/6fRlNQooQKejpJCQYxSiO6eVEJ02",
    "/item-info/Mask_ABC",
    "/transaction-info/DON_52374",

    //Registration pages
    "/patient-registration",
    "/practitioner-registration",
    "/item-registration",
    "/transaction-registration",
  ];

  return (
    <>
      <div className={styles.ButtonContainer}>
        {routeList.map((r, i) => {
          return (
            <button className={styles.Button} onClick={() => router.push(r)} key={i}>
              {r}
            </button>
          );
        })}
      </div>
    </>
  );
};
export default ButtonList;
