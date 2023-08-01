import React from "react";
import { Link } from "react-router-dom";
import styles from "./Landing.module.css";

const Landing = () => {
  return (
    <section className={styles.container}>
      <h1 className={styles.title}>GameDex</h1>
      <button className={styles.btn}>
        <Link to="/home" className={styles.link}>Get into the game!</Link>
      </button>
    </section>
  );
};

export default Landing;
