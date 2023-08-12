import React from "react";
import styles from "./Pagination.module.css";
import { arrowLeft, arrowRight } from "../../assets/img";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // * Tomando el valor entero de totalPages, creo un array enteros para renderiza botones con el numero
  // * que identifica cada pagina.
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handlePreviousPage = () => {
    // * Solo puede retroceder si no llego a la primera pagina.
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    // * Puede avanzar de pagina, siempre que no llego a la ultima.
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className={styles.pagination}>
      <button onClick={handlePreviousPage} className={`${currentPage === 1 && styles.btnDisable} ${styles.arrowBtn}`}>
        <img src={arrowLeft} alt="Previous page button" />
      </button>

      <ol className={styles.buttonsList}>
        {pageNumbers.map((number) => (
          <li key={number}>
            <button onClick={() => onPageChange(number)} className={`${styles.page_number} ${currentPage === number && styles.active}`}>{number}</button>
          </li>
        ))}
      </ol>

      <button onClick={handleNextPage} className={`${currentPage === totalPages && styles.btnDisable} ${styles.arrowBtn}`}>
        <img src={arrowRight} alt="Next page button" />
      </button>
    </div>
  );
};

export default Pagination;
