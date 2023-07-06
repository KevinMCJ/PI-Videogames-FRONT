import React from "react";
import styles from "./Pagination.module.css";
import { arrowLeft, arrowRight } from "../../assets/img";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePreviousPage = () => {
    // * Solo puede retroceder si no llego a la primera pagina.
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    // * Puede avanzar cada pagina, siempre que no llegue a la ultima.
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  // * Tomando el valor total, creo un array enteros para generar botones que identifican
  // * cada paging a partir del .map de este [1, 2, 3, 4, 5 ... N]
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

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
