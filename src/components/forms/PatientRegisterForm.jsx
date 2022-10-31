import React from "react";
import { useRouter } from "next/router";
import styles from "./patientRegisterForm.module.css";
import Image from 'next/image';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const pages = [
  { name: "Forms", href: "/forms" },
];

export const Forms = () => {
  const router = useRouter();

  return (
    <React.Fragment>
      <h3 className={styles.h3}>Patient Enrollment Form</h3>
      <div className={styles.center}>
        <div className={styles.picture}>
          <Image src="/forms/nurse.png" width="750%" height="750%"></Image>
        </div>
        <div className={styles.mainDetails}>
            <div className={styles.center}>
              <div className={styles.info}>
                <h5 className={styles.h5}>* mandatory field</h5>

              </div>
              <div className={styles.imageUpload}>
                <Image src="/forms/ddu.webp" width="260%" height="180%"></Image>
                <h4 className={styles.h4}>Max. Size: 5MB</h4>
                <h4 className={styles.h4}>Allowed Types: JPG, PNG, GIF, JPEG</h4>
                <div className={styles.center}>
                  <Stack spacing={2} direction="row">
                    <Button className={styles.btnSub} variant="contained">Upload</Button>
                    <Button className={styles.btnRes} variant="contained">Remove</Button>
                  </Stack>
                </div>
              </div>
            </div>
        </div>
        <div className={styles.otherDetails}>

          <div className={styles.btnAlign}>
            <Stack spacing={2} direction="row">
              <Button className={styles.btnSub} variant="contained">Submit</Button>
              <Button className={styles.btnRes} variant="contained">Reset</Button>
            </Stack>
          </div>
        </div>
      </div>
      <div className={styles.waveBack}>
        <svg className={styles.wave} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#A3B7B0" fill-opacity="1" d="M0,32L60,53.3C120,75,240,117,360,160C480,203,600,245,720,266.7C840,288,960,288,1080,277.3C1200,267,1320,245,1380,234.7L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
        </svg>
      </div>
    </React.Fragment>
  );
};

export default Forms;
