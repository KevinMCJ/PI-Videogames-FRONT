import React from "react";
import styles from "./EditGame.module.css";
import { useDispatch, useSelector } from "react-redux";
import { LoadingSpinner } from "../index";
import formValidator from "../../utils/validation";
import { useForm } from "../../hooks/useForm";
import { editGame } from "../../redux/actions/appActions";
import { SelectedOptionsList } from "../../components";

const MAX_PLATFORMS = 20;

// ! TO DO: FUNCIONALIDAD PARA CERRARLO Y QUE CUANDO LE DE CLICK SE CIERRE TAMBIEN.
const EditGame = () => {
  const dispatch = useDispatch();
  const gameToEdit = useSelector((state) => state.app.game);
  const platforms = useSelector((state) => state.app.platforms);
  const genres = useSelector((state) => state.app.genres);
  let isLoading = useSelector((state) => state.app.isLoading);

  const initialForm = {
    name: gameToEdit.name,
    platforms: gameToEdit.platforms,
    image: gameToEdit.image,
    released: gameToEdit.released,
    rating: gameToEdit.rating,
    genres: gameToEdit.genres,
    description: gameToEdit.description,
  };

  const { formData, errors, handleChange, handleMultipleSelect, handleList } =
    useForm(initialForm, formValidator);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await dispatch(editGame(gameToEdit.id, formData));
      alert(`Game edited succesfully.`);
    } catch (error) {
      alert(`Error editing game: ${error.message}`);
    }
  };

  return (
    <div className={styles.edit_modal}>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className={styles.form_wrapper}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <h1>{formData.name}</h1>
            <div className={styles.input_container}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                value={formData.name}
                placeholder="Game Name"
              />
              {errors.name && (
                <span className={`${styles.error} ${styles.error_center}`}>
                  {errors.name}
                </span>
              )}
            </div>
            <div className={styles.multiple_select_container}>
              <div className={styles.input_container}>
                <label htmlFor="platforms">Platforms</label>
                <select
                  name="platforms"
                  onChange={(e) => handleMultipleSelect(e, MAX_PLATFORMS)}
                  value={formData.platforms}
                  className={styles.select}
                  multiple
                >
                  <option value="" disabled>
                    Select a platform
                  </option>
                  {platforms.map((platform) => (
                    <option key={platform.id} value={platform.name}>
                      {platform.name}
                    </option>
                  ))}
                </select>
                {errors.platforms && (
                  <span className={styles.error}>{errors.platforms}</span>
                )}
              </div>
              <span className={styles.max_options_span}>
                Max:{MAX_PLATFORMS}
              </span>
              <SelectedOptionsList
                arrValues={formData.platforms}
                handleList={handleList}
                listName="platforms"
              />
            </div>
            <div className={styles.grid_two_columns}>
              <div className={styles.input_container}>
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
              <div className={styles.input_container}>
                <label htmlFor="rating">Rating</label>
                <input
                  type="text"
                  name="rating"
                  onChange={handleChange}
                  value={formData.rating}
                  placeholder="1 - 5"
                />
                {errors.rating && (
                  <span className={styles.error}>{errors.rating}</span>
                )}
              </div>
            </div>
            <div className={styles.multiple_select_container}>
              <div className={styles.input_container}>
                <label htmlFor="genres">Genres</label>
                <select
                  name="genres"
                  id="genres"
                  onChange={handleMultipleSelect}
                  value={formData.genres}
                  className={styles.select}
                  multiple
                >
                  <option value="" disabled>
                    Select a genre
                  </option>
                  {genres.map((genre) => (
                    <option key={genre.id} value={genre.name}>
                      {genre.name}
                    </option>
                  ))}
                </select>
                {errors.genres && (
                  <span className={styles.error}>{errors.genres}</span>
                )}
              </div>
              <SelectedOptionsList
                arrValues={formData.genres}
                handleList={handleList}
                listName="genres"
              />
            </div>
            <div className={styles.input_container}>
              <label htmlFor="image">Background Image</label>
              <input
                type="text"
                name="image"
                onChange={handleChange}
                value={formData.image}
                placeholder="https://example.com"
              />
              {errors.image && (
                <span className={`${styles.error} ${styles.error_center}`}>
                  {errors.image}
                </span>
              )}
            </div>
            <div className={styles.input_container}>
              <label htmlFor="description">Description</label>
              <textarea
                name="description"
                onChange={handleChange}
                value={formData.description}
                cols="30"
                rows="8"
              />
              {errors.description && (
                <span className={`${styles.error} ${styles.error_center}`}>
                  {errors.description}
                </span>
              )}
            </div>
            <button type="submit" className={styles.submitBtn}>
              Edit Game
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditGame;
