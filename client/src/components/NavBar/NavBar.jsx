import React from "react";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";

const NavBar = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.heading}>
        <h1>GamesPI</h1>
      </div>
      <ul className={styles.linkList}>
        <li>
          <Link to="/home">
            <p>Home</p>
          </Link>
        </li>
        <li>
          <Link to="/create">
            <p>Create</p>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
