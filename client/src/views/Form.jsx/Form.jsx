import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createGame } from "../../redux/actions";
import formValidator from "./validation";
import styles from "./Form.module.css";

const Form = () => {
  const dispatch = useDispatch();
  const platforms = useSelector((state) => state.platforms);
  const genres = useSelector((state) => state.genres);

  const [formData, setFormData] = useState({
    name: "",
    platforms: [],
    image: "",
    released: "",
    rating: "",
    genres: [],
    description: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
    setErrors(
      formValidator({
        ...formData,
        [name]: value,
      })
    );
  };

  const handleMultipleSelect = (event) => {
    let { value, name } = event.target;

    /*
     * Los select multiples como platforms y genres, guardaran su valor en un array que no
     * permite tener repeticiones y al menos debe tener 1 valor. Como máximo 10 [hay 19 genres].
     */
    if (formData[name].length < 10 && !formData[name].includes(value)) {
      setFormData({
        ...formData,
        [name]: [...formData[name], value],
      });
    }
  };

  const handleList = (event) => {
    const { innerText, dataset } = event.target;
    const category = dataset.category;

    const filteredSelect = formData[category].filter(
      (value) => value !== innerText
    );

    setFormData({
      ...formData,
      [category]: filteredSelect,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      const newGame = formData;
      dispatch(createGame(newGame)).then(() =>
        alert(`"${newGame.name}" game created successfully`)
      );
    } catch (error) {
      alert("Error creating a new game: " + error.message);
    }
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <h1>NEW GAME</h1>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            value={formData.name}
            placeholder="Game Name"
          />
          {errors.name && <span className={styles.error}>{errors.name}</span>}
        </div>
        <div>
          <label htmlFor="platforms">Platforms</label>
          <select
            name="platforms"
            onChange={handleMultipleSelect}
            value={formData.platforms}
          >
            {platforms.map((platform) => (
              <option key={platform.id} value={platform.name}>
                {platform.name}
              </option>
            ))}
          </select>
          {formData.platforms.length ? (
            <ul>
              {formData.platforms.map((platform) => (
                <li
                  key={platform}
                  onClick={handleList}
                  data-category="platforms"
                >
                  {platform}
                </li>
              ))}
            </ul>
          ) : (
            <p>Select at least one platform for the game.</p>
          )}
          {errors.platforms && (
            <span className={styles.error}>{errors.platforms}</span>
          )}
        </div>
        <div>
          <label htmlFor="release-date" name="released">
            Release Date
          </label>
          <input
            type="date"
            name="released"
            id="released"
            onChange={handleChange}
            value={formData.released}
          />
          {errors.released && (
            <span className={styles.error}>{errors.released}</span>
          )}
        </div>
        <div>
          <label htmlFor="rating">Rating</label>
          <input
            type="number"
            name="rating"
            onChange={handleChange}
            value={formData.rating}
            placeholder="1 - 5"
          />
          {errors.rating && (
            <span className={styles.error}>{errors.rating}</span>
          )}
        </div>
        <div>
          <label htmlFor="genres">Genres</label>
          <select
            name="genres"
            id="genres"
            onChange={handleMultipleSelect}
            value={formData.genres}
          >
            {genres.map((genre) => (
              <option key={genre.id} value={genre.name}>
                {genre.name}
              </option>
            ))}
          </select>
          {formData.genres.length ? (
            <ul>
              {formData.genres.map((genre) => (
                <li key={genre} onClick={handleList} data-category="genres">
                  {genre}
                </li>
              ))}
            </ul>
          ) : (
            <p>Select at least one genre for the game.</p>
          )}
          {errors.genres && (
            <span className={styles.error}>{errors.genres}</span>
          )}
        </div>
        <div>
          <label htmlFor="image">Background Image</label>
          <input
            type="text"
            name="image"
            onChange={handleChange}
            value={formData.image}
            placeholder="https://example.com"
          />
          {errors.image && <span className={styles.error}>{errors.image}</span>}
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            onChange={handleChange}
            value={formData.description}
            cols="30"
            rows="8"
          />
          {errors.description && (
            <span className={styles.error}>{errors.description}</span>
          )}
        </div>
        <button type="submit">Create Game</button>
      </form>
    </section>
  );
};

export default Form;
