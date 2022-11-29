import React from "react";
import { Transaction } from "src/config/interfaces";
import moment from "moment";
import styles from "./DetailedTransactionInfo.module.css";

export const DetailedTransactionInfo = ({ transactionData }) => {
  const {
    id = "None",
    type = "None",
    name = "None",
    amount = "None",
    date = "None",
  } = transactionData;

  return (
    <div className={styles.Container}>
      <div className={styles.Card}>
        <h2>Transaction Information</h2>
        <ul>
          <li>ID: {id}</li>
          <li>Name: {name}</li>
          <li>Type: {type}</li>
          <li>Amount: {amount}</li>
          <li>Date: {moment(new Date(date.toDate())).format("YYYY-MM-DD").toString()}</li>
        </ul>
      </div>
    </div>
  );
};
