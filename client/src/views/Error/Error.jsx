import React from "react";
import styles from "./Error.module.css";

const Error = () => {
  return (
    <section className={styles.error_section}>
      <h1>ERROR 404</h1>
      <p>Page not found 😞</p>
    </section>
  );
};

export default Error;
