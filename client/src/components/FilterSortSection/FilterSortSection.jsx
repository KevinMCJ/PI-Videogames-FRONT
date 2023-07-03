import React from "react";
import { FilterButton, SortBy } from "../index";
import { useDispatch } from "react-redux";
import { clearAllFilters } from "../../redux/actions";
import styles from "./FilterSortSection.module.css"
import { clearIcon } from "../../assets/img";

const FilterSortSection = ({ handlePageChange }) => {
  const dispatch = useDispatch();

  return (
    <section className={styles.container}>
      <FilterButton handlePageChange={handlePageChange} />
      <SortBy handlePageChange={handlePageChange} />
      <button onClick={() => dispatch(clearAllFilters())} className={styles.clearBtn}>
        Clear All Filters
        <img src={clearIcon} alt="Clear icon" />
      </button>
    </section>
  );
};

export default FilterSortSection;
