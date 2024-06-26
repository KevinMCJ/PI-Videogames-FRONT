import React from 'react';
import styles from './Card.module.css';
import { useNavigate } from 'react-router-dom';

const Card = ({ game }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/detail/${game.id}`);
  };

  return (
    <div onClick={handleCardClick} className={styles.card}>
      <div className={styles.header_card}>
        <h2>{game.name}</h2>
        <img src={game.background_image} alt={`${game.name} cover`} />
      </div>
      <ul className={styles.listGenres}>
        {game.genres && game.genres.length > 0
          ? game.genres.map((genre) => <li key={genre.id}>{genre.name}</li>)
          : null}
      </ul>
    </div>
  );
};

export default Card;
