import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  getVideogamesByName,
  setLoading,
} from '../../redux/actions/appActions.js';
import styles from './SearchBar.module.css';

const SearchBar = ({ handlePageChange }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(setLoading(true));
    dispatch(getVideogamesByName(name)).then(() => {
      dispatch(setLoading(false));
      setName('');
      handlePageChange(1);
    });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.search}>
      <label htmlFor="search">Search By Name</label>
      <div className={styles.bar}>
        <input
          type="search"
          onChange={handleChange}
          placeholder="Name of a game"
          value={name}
          className={styles.input}
        />
        <button type="submit" className={styles.searchBtn}>
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
