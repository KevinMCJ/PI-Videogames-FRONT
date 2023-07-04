import React from "react";
import { Link } from "react-router-dom";
import styles from "./Landing.module.css"

const Landing = () => {
  return (
    <section className={styles.container}>
      <h1 className={styles.title}>GameDex</h1>
      <Link to="/home">
        <button className={styles.btn}>Explore!</button>
      </Link>
    </section>
  );
};

export default Landing;
