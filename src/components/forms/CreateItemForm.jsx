import React, { useState } from "react";
import { useRouter } from "next/router";
import { FormInput } from "src/components/forms/FormInput";
import styles from "./patientRegisterForm.module.css";
import Button from "@mui/material/Button";
import { createInventoryItem } from "src/api/db";
import { integerPropType } from "@mui/utils";

const pages = [{ name: "Forms", href: "/forms" }];

export const CreateItemForm = () => {
  const router = useRouter();

  const [formVals, setFormVals] = useState({
    id: "",
    name: "",
    price: "",
    stock: "",
  });

  const [itemCreated, setItemCreated] = useState(null);

  const inputs = [
    {
      id: "id",
      name: "id",
      type: "text",
      placeholder: "ID",
      errorMessage: "Please provide ID",
      label: "ID",
      required: true,
    },
    {
      id: "name",
      name: "name",
      type: "text",
      placeholder: "Item name",
      errorMessage: "Please provide item name",
      label: "Item name",
      required: true,
    },
    {
      id: "price",
      name: "price",
      type: "number",
      min: "0",
      placeholder: "Price",
      errorMessage: "Please provide item price",
      label: "Price",
      required: true,
    },
    {
      id: "stock",
      name: "stock",
      type: "number",
      min: "0",
      max: "10000",
      placeholder: "Stock",
      errorMessage: "Please provide item stock",
      label: "Quantity",
      required: true,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formVals);

    const { id, name, price, stock } = formVals;

    const tempItem = {
      name: name,
      stock: parseInt(stock),
      id: id,
      price: parseInt(price),
    };

    // console.log(tempItem);

    //TODO: add route protection + item registration
    // const hasLoggedIn = await registerPractitioner(login, practitioner);
    // if (hasLoggedIn) {
    //   router.push("/admin-home");
    // } else {
    //   alert("Sorry it has failed : ( Please try again!");
    // }

    const res = await createInventoryItem(tempItem);
    setItemCreated(res);
  };

  const onChange = (e) => {
    setFormVals({ ...formVals, [e.target.name]: e.target.value });
  };

  return (
    <React.Fragment>
      <h3 className={styles.h3}>Add a new item</h3>
      <div className={styles.center}>
        <form
          onSubmit={handleSubmit}
          className={styles.FormItems}
          style={{ gridTemplateColumns: "1fr", width: "50%" }}
        >
          <div className={styles.mainDetails}>
            <h4 className={styles.h4}>Item details</h4>
            {inputs.map((input) => (
              <FormInput
                key={input.id}
                {...input}
                value={formVals[input.name]}
                onChange={onChange}
              />
            ))}
          </div>
          <Button type="submit" className={styles.btnSub1} variant="contained">
            Submit
          </Button>
          <br></br>
          {itemCreated && <span className={styles.successMsg}>Item added</span>}
          {itemCreated === false && <span className={styles.errorMsg}>Failed to add item</span>}
        </form>
      </div>
    </React.Fragment>
  );
};

export default CreateItemForm;
