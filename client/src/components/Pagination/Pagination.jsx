import React from "react";
import styles from "./Pagination.module.css";

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

  // * Tomando el valor total, creo un array enteros para generar un botones que identifican
  // * cada paging a partir del .map de este [1, 2, 3, 4, 5 ... N]
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={styles.pagination}>
      <button onClick={handlePreviousPage}>Prev</button>

      <ol className={styles.buttonsList}>
        {pageNumbers.map((number) => (
          <li key={number}>
            <button onClick={() => onPageChange(number)}>{number}</button>
          </li>
        ))}
      </ol>

      <button onClick={handleNextPage}>Next</button>
    </div>
  );
};

export default Pagination;
