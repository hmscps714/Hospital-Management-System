import React, { useState } from "react";
import { FormInput } from "src/components/forms/FormInput";
import styles from "./DetailedItemInfo.module.css";
import { InventoryItem } from "src/config/interfaces";
import { updateInventoryItem, deleteInventoryItem } from "src/api/db";
import { useRouter } from "next/router";

export const DetailedItemInfo = ({ itemData }: { itemData: InventoryItem }) => {
  const route = useRouter();
  const { name, id, stock, price } = itemData;

  //Set initial state as item's inventory
  const [itemQuantity, setItemQuantity] = useState(stock);

  //State for the stock information in db
  const [dbItemQuantity, setDbItemQuantity] = useState(stock);

  //State to keep track of updates
  const [updateStatus, setUpdateStatus] = useState(null);

  const FormInputProps = {
    id: "quantity",
    name: "quantity",
    type: "number",
    label: "Enter item quantity:",
    min: "0",
    max: "10000",
    placeholder: "Quantity",
    errorMessage: "Please provide a valid quantity between the range 0 and 10000",
    required: true,
    pattern: `[0-9]*`,
  };

  const onChange = (e) => {
    setItemQuantity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (itemQuantity == dbItemQuantity) {
      alert("No changes in update!");
    } else if (itemQuantity >= 0 && itemQuantity <= 10000) {
      const msg = `Are you sure you want to update the quantity from ${dbItemQuantity} to ${itemQuantity}?`;
      if (confirm(msg) == true) {
        updateInventoryItem({ ...itemData, stock: itemQuantity }).then((status) => {
          if (status) {
            setUpdateStatus(true);
            setDbItemQuantity(itemQuantity);
          } else {
            setUpdateStatus(false);
          }
        });
      }
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    const msg = "Are you sure you want to delete this item? Note: this action cannot be undone.";
    if (confirm(msg) == true) {
      deleteInventoryItem(id).then((res) => {
        if (res) {
          alert("Item deleted!");
          route.push("/inventory-list");
        } else {
          alert("Error: Failed to delete item");
        }
      });
    }
  };

  return (
    <div className={styles.Container}>
      <div className={styles.Card}>
        <h2>Item information</h2>
        <ul>
          <li>ID: {id}</li>
          <li>Name: {name}</li>
          <li>Quantity: {dbItemQuantity}</li>
          <li>Price per item: {price}</li>
        </ul>
      </div>
      <div className={styles.Card}>
        <h2>Item actions</h2>
        <form onSubmit={handleSubmit}>
          <FormInput {...FormInputProps} onChange={onChange}></FormInput>
          <div className={styles.BtnContainer}>
            <button type="submit" className={styles.UpdateBtn}>
              Update
            </button>
            <button onClick={handleDelete} className={styles.DeleteBtn}>
              Delete
            </button>
          </div>
          <span className={styles.UpdateMessageSuccess}>
            {updateStatus ? "Update successful" : null}
          </span>
          <span className={styles.UpdateMessageFail}>
            {updateStatus === false ? "Error: Update failed" : null}
          </span>
        </form>
      </div>
    </div>
  );
};

export default DetailedItemInfo;
