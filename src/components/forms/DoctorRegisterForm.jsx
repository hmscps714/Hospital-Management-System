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
      <h3 className={styles.h3}>Doctor Enrollment Form</h3>
      <div className={styles.center}>
        <div className={styles.picture}>
          <Image src="/forms/doctor.png" width="640%" height="850%"></Image>
        </div>
        <div className={styles.mainDetails}>
            <div className={styles.center}>
              <div className={styles.info}>
                <h4 className={styles.h4}>Basic information</h4>
                  <label htmlFor="name" className={styles.font}> First Name <label className={styles.red}>*</label> </label>
                  <input className={styles.input2} id="name" name="name" type="text" autocomplete="name" required/>
                  <br></br>
                  <br></br>
                  <label htmlFor="name" className={styles.font}> Last Name <label className={styles.red}>*</label> </label>
                  <input className={styles.input2} id="name" name="name" type="text" autocomplete="name" required/>
                  <br></br>
                  <br></br>
                  <label htmlFor="name" className={styles.font}> Date of Birth <label className={styles.red}>*</label> </label>
                  <input className={styles.input3} id="name" name="name" type="text" autocomplete="name" required/>
                  <br></br>
                  <br></br>
                  <label htmlFor="name" className={styles.font}> Health Card Number <label className={styles.red}>*</label> </label>
                  <input className={styles.input10} id="name" name="name" type="text" autocomplete="name" required/>
                  <br></br>
                  <br></br>
                  <label htmlFor="name" className={styles.font}> Gender <label className={styles.red}>*</label> </label>
                  <input className={styles.input} id="name" name="name" type="text" autocomplete="name" required/>
                  <br></br>
                  <br></br>
                <h4 className={styles.h4}>Personal Contact Information</h4>
                  <label className={styles.font}>Email</label>
                  <input className={styles.input9}/>
                  <br></br>
                  <br></br>
                  <label className={styles.font}>Number</label>
                  <input className={styles.input}/>
                  <br></br>
                  <br></br>
                  <label className={styles.font}>Adress</label>
                  <input className={styles.input7}/>
                  <br></br>
                  <br></br>
                <h4 className={styles.h4}>Emergency Contact Information</h4>
                  <label className={styles.font}>Email</label>
                  <input className={styles.input9}/>
                  <br></br>
                  <br></br>
                  <label className={styles.font}>Number</label>
                  <input className={styles.input}/>
                  <br></br>
                  <br></br>
                  <label className={styles.font}>Adress</label>
                  <input className={styles.input7}/>
                  <br></br>
                  <br></br>
                  <label className={styles.font}>Relationship</label>
                  <input className={styles.input2}/>
                  <br></br>
                  <br></br>    
                <h5 className={styles.h5}>* mandatory field</h5>
              </div>
              <div className={styles.imageUpload}>
                <Image src="/forms/ddu.webp" width="283%" height="190%"></Image>
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
            <h4 className={styles.h4}>Family Physician Inforamtion</h4>
                <label className={styles.font}> Physician Name </label>
                <input className={styles.input1} />
                <br></br>
                <br></br>
                <label className={styles.font}> Clinic Name </label>
                <input className={styles.input2} />
                <br></br>
                <br></br>
                <label className={styles.font}> Clinic Address </label>
                <input className={styles.input3} />
                <br></br>
                <br></br>
                <label className={styles.font}> Clinic Phone </label>
                <input className={styles.input2} />
                <br></br>
                <br></br>
                <label className={styles.font}> Clinic Email </label>
                <input className={styles.input4} />
                <br></br>
                <br></br>
            <h4 className={styles.h4}>Preferred Pharmacy</h4>
                <label className={styles.font}>Name </label>
                <input className={styles.input5} />
                <br></br>
                <br></br>
                <label className={styles.font}>Phone </label>
                <input className={styles.input5} />
                <br></br>
                <br></br>
                <label className={styles.font}>Fax </label>
                <input className={styles.input6} />
                <br></br>
                <br></br>
                <label className={styles.font}>Address </label>
                <input className={styles.input7} />
                <br></br>
                <br></br>
                <label className={styles.font}>Email </label>
                <input className={styles.input8} />
                <br></br>
                <br></br>
                <br></br>
                <br></br>
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