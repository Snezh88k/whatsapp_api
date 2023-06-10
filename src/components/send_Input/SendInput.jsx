import React from "react";
import styles from "./SendInput.module.css";
import sendIcon from "../../image/sendIcon.png";

export default function SendInput({ messageEntry }) {
  return (
    <div className={styles.messageWrapper}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          messageEntry(e.target.message.value);
          e.target.message.value = "";
        }}
      >
        <input
          className={styles.messageInput}
          type="text"
          name="message"
          placeholder="Введите сообщение"
        />
        <input type="image" src={sendIcon} alt="Submit" width="30" />
      </form>
    </div>
  );
}
