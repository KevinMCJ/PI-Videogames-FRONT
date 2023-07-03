import React from "react";
import styles from "./Card.module.css";
import { Link } from "react-router-dom";

const Card = ({ game }) => {
  const { id, name, image, genres } = game;

  return (
    <Link to={`/detail/${id}`}>
      <div className={styles.card}>
        <div className={styles.header_card}>
          <h2>{name}</h2>
          <img src={image} alt={`${name} cover`} />
        </div>
        <ul className={styles.listGenres}>
          {genres && genres.map((genre, index) => <li key={index}>{genre}</li>)}
        </ul>
      </div>
    </Link>
  );
};

export default Card;
