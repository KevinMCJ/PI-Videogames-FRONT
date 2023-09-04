import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";
import { controllerIcon } from "../../assets/img";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeNavigation = () => {
    setIsOpen(false);
  }

  // * Cerrar el menu cuando cambia a desktop.
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 650) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link to="/">
          <div className={styles.heading}>
            <img src={controllerIcon} alt="Controller icon" />
            <h1>GameDex</h1>
          </div>
        </Link>
        <button className={`${styles.toggleBtn} ${isOpen ? styles.open : ""}`}>
          <img
            src={controllerIcon}
            alt="Controller icon"
            onClick={() => setIsOpen(!isOpen)}
          />
        </button>
        <ul className={`${styles.linkList} ${isOpen ? styles.open : ""}`}>
          <li>
            <Link to="/home" onClick={closeNavigation}>
              <p>Home</p>
            </Link>
          </li>
          <li>
            <Link to="/create" onClick={closeNavigation}>
              <p>Create</p>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
