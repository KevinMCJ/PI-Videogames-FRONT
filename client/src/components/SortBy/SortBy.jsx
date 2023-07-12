import React from "react";
import { useDispatch } from "react-redux";
import { sortGamesByName, sortGamesByRating } from "../../redux/actions/appActions";
import styles from "./SortBy.module.css";

const SortBy = ({ handlePageChange }) => {
  const dispatch = useDispatch();

  const handleSelect = (event) => {
    const { name, value } = event.target;

    // * Value sera el order elegido por el usuario [asc - desc - highest - lowest].
    if (name === "sort-name") {
      dispatch(sortGamesByName(value));
    } else if (name === "sort-rating") {
      dispatch(sortGamesByRating(value));
    }
    handlePageChange(1);
  };

  return (
    <div className={styles.container}>
      <div>
        <label htmlFor="sort-name" className={styles.label}>Sort By Name</label>
        <select
          name="sort-name"
          id="sort-name"
          onChange={handleSelect}
          className={styles.select}
          value=""
        >
          <option value="" disabled>Select option</option>
          <option value="asc">Name (a-z)</option>
          <option value="desc">Name (z-a)</option>
        </select>
      </div>
      <div>
        <label htmlFor="sort-rating" className={styles.label}>Sort By Rating</label>
        <select
          name="sort-rating"
          id="sort-rating"
          onChange={handleSelect}
          className={styles.select}
          value=""
        >
          <option value="" disabled>Select option</option>
          <option value="highest">Rating (Highest)</option>
          <option value="lowest">Rating (Lowest)</option>
        </select>
      </div>
    </div>
  );
};

export default SortBy;
