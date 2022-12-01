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
    "/item-info/INV_00001",
    "/transaction-info/DON_52374",

    //Registration pages
    "/patient-registration",
    "/practitioner-registration",
    "/item-registration",
    "/transaction-registration",
    "/password-reset",
  ];

  return (
    <>
      <div className={styles.ButtonContainer}>
        <h1>NOTE: this section is meant for testing. Will be removed in final version</h1>
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
