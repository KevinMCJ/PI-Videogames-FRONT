import { useState } from "react";
import { useDispatch } from "react-redux";
import { getVideogamesByName, setLoading } from "../../redux/actions.js";
import styles from "./SearchBar.module.css";

const SearchBar = ({ handlePageChange }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(setLoading(true));
    dispatch(getVideogamesByName(name)).then(() => {
      dispatch(setLoading(false));
      handlePageChange(1);
    });
  };

  return (
    <div className={styles.search}>
      <label htmlFor="search">Search By Name</label>
      <div className={styles.bar}>
        <input
          type="search"
          onChange={handleChange}
          placeholder="Name of a game"
          value={name}
          className={styles.input}
        />
        <button
          type="button"
          onClick={handleSubmit}
          className={styles.searchBtn}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
