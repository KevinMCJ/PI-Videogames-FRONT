import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterGames } from "../../../redux/actions";
import styles from "./FilterOptions.module.css";

const FilterOptions = ({ setIsOpen, handlePageChange }) => {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedOrigin, setSelectedOrigin] = useState("all");

  const handleCheckboxChange = (event) => {
    const { name, value, checked } = event.target;

    /*
     * Checked es una propiedad del checkbox que indica si esta marcado o no.
     * Si lo esta, se agrega el valor [genero] al array de seleccionados.
     * De lo contrario, si lo desmarca, se elimina del array de seleccionados.*/
    if (name === "genre") {
      setSelectedGenres(
        checked
          ? [...selectedGenres, value]
          : selectedGenres.filter((genre) => genre !== value)
      );
    }

    // * Origin solo acepta una opción, por defecto se encuentra el valor "all".
    if (name === "origin") setSelectedOrigin(value);
  };

  const handleFilter = () => {
    dispatch(
      filterGames({
        selectedGenres,
        selectedOrigin,
      })
    );
    handlePageChange(1);
  };

  return (
    <section>
      <div>
        <h3>GENRES</h3>
        <ul>
          {genres.map((genre) => (
            <li>
              <input
                type="checkbox"
                name="genre"
                value={genre.name}
                checked={selectedGenres.includes(genre.name)}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="genre">{genre.name}</label>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>ORIGIN</h3>
        <ul className={styles.origin_list}>
          <li>
            <input
              type="checkbox"
              name="origin"
              value="all"
              checked={selectedOrigin === "all"}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="origin">All</label>
          </li>
          <li>
            <input
              type="checkbox"
              name="origin"
              value="api"
              checked={selectedOrigin === "api"}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="origin">API</label>
          </li>
          <li>
            <input
              type="checkbox"
              name="origin"
              value="created"
              checked={selectedOrigin === "created"}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="origin">Created</label>
          </li>
        </ul>
      </div>
      <button
        onClick={() => {
          handleFilter();
          setIsOpen(false);
        }}
      >
        Apply Filter
      </button>
    </section>
  );
};

export default FilterOptions;
