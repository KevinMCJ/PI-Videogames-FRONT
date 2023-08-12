import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getVideogameById, setLoading } from "../../redux/actions/appActions";
import { LoadingSpinner } from "../../components";
import Mobile from "./Mobile";
import styles from "./Detail.module.css";
import {
  bookIcon,
  gamepadIcon,
  calendarIcon,
  ratingIcon,
  notesIcon,
} from "../../assets/img";

const Detail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const game = useSelector((state) => state.app.game);
  let isLoading = useSelector((state) => state.app.isLoading);

  useEffect(() => {
    dispatch(setLoading(true));
    dispatch(getVideogameById(id)).then(() => dispatch(setLoading(false)));
  }, [dispatch, id]);

  return (
    <section className={styles.detail_section}>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className={styles.detail_wrapper}>
            <div className={styles.detail_container}>
              <img
                src={game.image}
                alt={`${game.name} cover`}
                className={styles.image}
              />
              <div className={styles.info_container}>
                <h1>{game.id}</h1>
                <h2 className={styles.text_center}>{game.name}</h2>
                <div className={styles.flex_info_wrapper}>
                  <div className={styles.list_container}>
                    <div className={styles.info_heading}>
                      <img src={bookIcon} alt="Genres icon" />
                      <h3 className={styles.info_title}>Genres</h3>
                    </div>
                    <ul className={styles.list}>
                      {game.genres &&
                        game.genres.map((genre, index) => (
                          <li key={index}>{genre}</li>
                        ))}
                    </ul>
                  </div>
                  <div className={styles.list_container}>
                    <div className={styles.info_heading}>
                      <img src={gamepadIcon} alt="Platform icon" />
                      <h3 className={styles.info_title}>Platforms</h3>
                    </div>
                    <ul className={styles.list}>
                      {game.platforms &&
                        game.platforms.map((platform, index) => (
                          <li key={index}>{platform}</li>
                        ))}
                    </ul>
                  </div>
                  <div className={styles.short_info_container}>
                    <div className={styles.info_heading}>
                      <img src={calendarIcon} alt="Date icon" />
                      <h3 className={styles.info_title}>Release date</h3>
                    </div>
                    <p>{game.released}</p>
                    <div className={styles.info_heading}>
                      <img src={ratingIcon} alt="Rating icon" />
                      <h3 className={styles.info_title}>Rating</h3>
                    </div>
                    <p>{game.rating}</p>
                  </div>
                </div>
              </div>
              <div className={styles.description_container}>
                <div className={styles.info_heading}>
                  <img src={notesIcon} alt="Notes icon" />
                  <h3 className={`${styles.info_title} ${styles.text_center}`}>
                    Description
                  </h3>
                </div>
                <p className={styles.description_paragraph}>
                  {game.description}
                </p>
              </div>
            </div>
          </div>
          <Mobile game={game} />
        </>
      )}
    </section>
  );
};

export default Detail;
