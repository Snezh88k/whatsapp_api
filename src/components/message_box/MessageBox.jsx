import React from "react";
import styles from "./MessageBox.module.css";
import { useSelector } from "react-redux";

export default function MessageBox() {
  const messages = useSelector((state) => state.messages.messages);

  return (
    <div className={styles.wrapper}>
      {messages.map((message, index) => {
        return (
          <div
            key={index}
            className={
              message.typeMessage === "incomingMessageReceived"
                ? styles.getMessage
                : styles.sendMessage
            }
          >
            {message.textMessage}
          </div>
        );
      })}
    </div>
  );
}
