import React, { useState } from "react";
import styles from "./Card.module.css";
import { editIcon, deleteIcon } from "../../assets/img";
import { useDispatch } from "react-redux";
import { setCardEdit } from "../../redux/actions/utilsActions";
import { useNavigate } from "react-router-dom";
import { deleteGame, setGame } from "../../redux/actions/appActions";
import Swal from "sweetalert2";

const Card = ({ game }) => {
  const { id, name, image, genres, origin } = game;
  const [redirectDetail, setRedirectDetail] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEditClick = () => {
    dispatch(setCardEdit(true));
    dispatch(setGame(game));
  };

  const handleDeleteGame = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      width: "35rem",
      customClass: `${styles.swal}`,
      background: "#02081A",
      color: "white",
      showCancelButton: true,
      confirmButtonColor: "#4f547e",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    })
      .then((result) => {
        if (result.isConfirmed) {
          dispatch(setGame(game));
          dispatch(deleteGame(id));
          Swal.fire("Deleted!", "Game has been deleted.", "success");
        }
      })
      .catch(() => {
        Swal.fire("error", "Error deleting the game!. Try again later.");
      });
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
        <div className={styles.card_buttons}>
          <button
            onMouseOver={() => setRedirectDetail(false)}
            onMouseLeave={() => setRedirectDetail(true)}
            onClick={handleEditClick}
            className={styles.edit_button}
          >
            <h3>Edit</h3>
            <img src={editIcon} alt="Edit game icon" />
          </button>
          <button
            onMouseOver={() => setRedirectDetail(false)}
            onMouseLeave={() => setRedirectDetail(true)}
            onClick={handleDeleteGame}
            className={styles.delete_button}
          >
            <h3>Delete</h3>
            <img src={deleteIcon} alt="Delete game icon" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Card;
