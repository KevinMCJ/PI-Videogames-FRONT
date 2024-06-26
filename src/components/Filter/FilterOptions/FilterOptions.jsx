import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterGames } from '../../../redux/actions/appActions';
import styles from './FilterOptions.module.css';

const FilterOptions = ({ setIsOpen, handlePageChange }) => {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.app.genres);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const handleCheckboxChange = (event) => {
    const { name, value, checked } = event.target;

    /*
     * Checked es una propiedad del checkbox que indica si esta marcado o no.
     * Si lo esta, se agrega el valor [genero] al array de seleccionados.
     * De lo contrario, si lo desmarca, se elimina del array de seleccionados.*/
    if (name === 'genre') {
      setSelectedGenres(
        checked
          ? [...selectedGenres, value]
          : selectedGenres.filter((genre) => genre !== value)
      );
    }
  };

  const handleFilter = () => {
    dispatch(
      filterGames({
        selectedGenres,
      })
    );
    handlePageChange(1);
  };

  return (
    <section className={styles.modal}>
      <div className={styles.filters_grid}>
        <div className={styles.filter_column}>
          <h3>GENRES</h3>
          <ul className={styles.genres_list}>
            {genres.map((genre) => (
              <li className={styles.list_item}>
                <input
                  type="checkbox"
                  name="genre"
                  value={genre.name}
                  checked={selectedGenres.includes(genre.name)}
                  onChange={handleCheckboxChange}
                  className={styles.checkbox}
                />
                <label htmlFor="genre">{genre.name}</label>
              </li>
            ))}
          </ul>
        </div>
        {/* <div className={styles.filter_column}>
          <h3>PLATFORMS</h3>
          <ul className={styles.origin_list}>
            {platforms.map(data => (
              <li className={styles.list_item}>
                <input type="checkbox" name="origin" value={data.platform.name} checked={selectedOrigin === origin} onChange={handleCheckboxChange} className={styles.checkbox}/>
                <label htmlFor="origin">{origin}</label>
              </li>
            )) }
          </ul>
        </div> */}
      </div>
      <button
        onClick={() => {
          handleFilter();
          setIsOpen(false);
        }}
        className={styles.filterBtn}
      >
        Apply Filter
      </button>
    </section>
  );
};

export default FilterOptions;
