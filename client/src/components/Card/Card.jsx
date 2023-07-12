import React, { useState } from "react";
import styles from "./Card.module.css";
import { editIcon } from "../../assets/img";
import { useDispatch } from "react-redux";
import { setCardEdit } from "../../redux/actions/utilsActions";
import { useNavigate } from "react-router-dom";
import { setGame } from "../../redux/actions/appActions";

const Card = ({ game }) => {
  const { id, name, image, genres, origin } = game;
  const [redirectDetail, setRedirectDetail] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEditClick = () => {
    dispatch(setCardEdit());
    dispatch(setGame(game));
  };

  const handleCardClick = () => {
    if (redirectDetail) navigate(`/detail/${id}`);
  };

  return (
    <div onClick={handleCardClick} className={styles.card}>
      <div className={styles.header_card}>
        <h2>{name}</h2>
        <img src={image} alt={`${name} cover`} />
      </div>
      <ul className={styles.listGenres}>
        {genres && genres.map((genre, index) => <li key={index}>{genre}</li>)}
      </ul>
      {origin === "created" && (
        <button
          onMouseOver={() => setRedirectDetail(false)}
          onMouseLeave={() => setRedirectDetail(true)}
          onClick={handleEditClick}
          className={styles.edit_button}
        >
          <h3>Edit</h3>
          <img src={editIcon} alt="Edit game icon" />
        </button>
      )}
    </div>
  );
};

export default Card;
