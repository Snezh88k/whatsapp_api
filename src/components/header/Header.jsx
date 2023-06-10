import React, { useState } from "react";
import styles from "./Header.module.css";
import userIcon from "../../image/userIcon.png";

export default function Header({ updateTel }) {
  const [tel, setTel] = useState();
  const [id, setId] = useState();
  const [token, setToken] = useState();

  const updateInfo = (e) => {
    if (e.target.name === "tel") {
      setTel(e.target.value);
    } else if (e.target.name === "idInstance") {
      setId(e.target.value);
    } else if (e.target.name === "apiTokenInstance") {
      setToken(e.target.value);
    }
  };
  return (
    <div className={styles.telWrapper}>
      <img src={userIcon} alt="icon_user" />
      <form
        onChange={(e) => {
          updateInfo(e);
        }}
      >
        <input type="tel" name="tel" placeholder="Введите телефон" required />
        <input
          type="text"
          name="idInstance"
          placeholder="idInstance"
          required
        />
        <input
          type="text"
          name="apiTokenInstance"
          placeholder="apiTokenInstance"
          required
        />

        <input
          type="submit"
          value="Сохранить"
          onClick={(e) => {
            e.preventDefault();
            updateTel(tel, id, token);
          }}
        />
      </form>
    </div>
  );
}
