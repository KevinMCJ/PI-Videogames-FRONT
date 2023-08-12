import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearAlert } from "../../redux/actions/utilsActions";
import styles from "./CustomAlert.module.css"

const CustomAlert = ({ message, time = 1500, status }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(clearAlert());
    }, time);

    return () => clearTimeout(timeout);
  }, [dispatch, time]);

  return (
    <div className={`${styles.alert} ${styles[status]}`}>
      <p className={styles.message}>{message}</p>
    </div>
  );
};

export default CustomAlert;
