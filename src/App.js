import styles from "./App.module.css";
import { useEffect, useState } from "react";
import Header from "./components/header/Header";
import SendInput from "./components/send_Input/SendInput";
import MessageBox from "./components/message_box/MessageBox";
import { fetchGetMessage, fetchPostMessage } from "./store/slice/messageSlice";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();

  const [tel, setTel] = useState();
  const [id, setId] = useState();
  const [token, setToken] = useState();

  const updateTel = (tel, id, token) => {
    setTel(tel);
    setId(id);
    setToken(token);
  };

  useEffect(() => {
    const idInterval = setInterval(() => {
      if (id && token) {
        dispatch(fetchGetMessage({ id: id, token: token }));
      }
    }, 6000);

    return () => {
      clearInterval(idInterval);
    };
  }, [dispatch, id, token]);

  const messageEntry = (value) => {
    if (!tel || !id || !token) {
      alert("Заполните всю информацию!");
    } else {
      dispatch(
        fetchPostMessage({
          idInstance: id,
          token: token,
          tel: tel,
          text: value,
        })
      );
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.chatWrapper}>
        <Header updateTel={updateTel} />
        <MessageBox />
        <SendInput messageEntry={messageEntry} />
      </div>
    </div>
  );
}

export default App;
