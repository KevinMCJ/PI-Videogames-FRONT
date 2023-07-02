import React from "react";
import { useSelector } from "react-redux";
import { createGame } from "../../redux/actions";
import formValidator from "./validation";
import styles from "./Form.module.css";
import { useForm } from "../../hooks/useForm";
import { SelectedOptionsList } from "../../components";

const MAX_PLATFORMS = 20;
const initialForm = {
  name: "",
  platforms: [],
  image: "",
  released: "",
  rating: "",
  genres: [],
  description: "",
};

const Form = () => {
  const platforms = useSelector((state) => state.platforms);
  const genres = useSelector((state) => state.genres);

  const {
    formData,
    errors,
    handleChange,
    handleMultipleSelect,
    handleList,
    handleSubmit,
  } = useForm(initialForm, formValidator, createGame, "Game");

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
            onChange={(e) => handleMultipleSelect(e, MAX_PLATFORMS)}
            value={formData.platforms}
            multiple
          >
            {platforms.map((platform) => (
              <option key={platform.id} value={platform.name}>
                {platform.name}
              </option>
            ))}
          </select>
          <span>Max:{MAX_PLATFORMS}</span>
          <SelectedOptionsList
            arrValues={formData.platforms}
            handleList={handleList}
            listName="platforms"
          />
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
            multiple
          >
            {genres.map((genre) => (
              <option key={genre.id} value={genre.name}>
                {genre.name}
              </option>
            ))}
          </select>
          <SelectedOptionsList
            arrValues={formData.genres}
            handleList={handleList}
            listName="genres"
          />
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
