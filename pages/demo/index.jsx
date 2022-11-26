import React from "react";
import { useRouter } from "next/router";
import styles from "./Demo.module.css";
import { ButtonList } from "src/components/ButtonList/ButtonList";

export const Demo = () => {
  const router = useRouter();
  return (
    <>
      <h1 className={styles.Title}>Demo page</h1>
      <ButtonList></ButtonList>
      {/* <div className={styles.ButtonContainer}>
        <button onClick={() => router.push("/patients-list")}>Patients List</button>
        <button onClick={() => router.push("/doctors-list")}>Doctors List</button>
        <button onClick={() => router.push("/nurses-list")}>Nurses List</button>
        <button onClick={() => router.push("/inventory-list")}>Inventory List</button>
      </div> */}
    </>
  );
};

export default Demo;
