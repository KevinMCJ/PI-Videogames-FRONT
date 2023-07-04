import React from "react";
import styles from "./SelectedOptionsList.module.css";
import { clearIcon } from "../../assets/img";

const SelectedOptionsList = ({ arrValues, handleList, listName }) => {
  return (
    <>
      {arrValues.length ? (
        <ul className={styles.selected_options_list}>
          {arrValues.map((value) => (
            <li key={value} onClick={(e) => handleList(e, listName)} className={styles.list_item}>
              {value}
              <img src={clearIcon} alt="Remove icon" />
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.text}>Select at least one option.</p>
      )}
    </>
  );
};

export default SelectedOptionsList;
