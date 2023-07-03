import React, { useState } from "react";
import { FilterOptions } from "../../index";
import styles from "./FilterButton.module.css";
import { filterIcon } from "../../../assets/img";

const FilterButton = ({ handlePageChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.filter}>
      <button onClick={() => setIsOpen(!isOpen)} className={styles.filterBtn}>
        Filter By
        <img src={filterIcon} alt="Filter icon" />
      </button>
      {isOpen && (
        <FilterOptions
          setIsOpen={setIsOpen}
          handlePageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default FilterButton;
