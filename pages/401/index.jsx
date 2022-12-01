import React from "react";
import { useRouter } from "next/router";
import styles from "./page401.module.css";

export const page401 = () => {
  const router = useRouter();
  return (
    <>
      <title>Error 401: Access Denied</title>
      <div className={styles.page401}>
        <div className={styles.contents}>
          <img src="401/error.png" alt="" />
          <h1>Error: Access Denied.</h1>
          <p>
            You don't have permission to access this page. <br />
            Please contact an administrator if you think this is an error.{" "}
          </p>
          <button onClick={() => router.push("/login")}>Back to login</button>
          <button onClick={() => router.push("/demo")}>Back to demo</button>
        </div>
      </div>
    </>
  );
};

export default page401;
