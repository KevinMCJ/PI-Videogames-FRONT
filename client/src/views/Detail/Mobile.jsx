import styles from "./Mobile.module.css";
import {
  bookIcon,
  gamepadIcon,
  calendarIcon,
  ratingIcon,
  notesIcon,
} from "../../assets/img";

const Mobile = ({ game }) => {
  return (
    <div className={styles.mobile_wrapper}>
      <h1 className={styles.title}>{game.name}</h1>
      <img
        src={game.image}
        alt={`${game.name} cover`}
        className={styles.image}
      />
      <div className={styles.info_container}>
        <div>
          <div className={styles.info_heading}>
            <img src={bookIcon} alt="Genres icon" />
            <h3 className={styles.info_title}>Genres</h3>
          </div>
          <ul className={styles.list}>
            {game.genres &&
              game.genres.map((genre, index) => <li key={index}>{genre}</li>)}
          </ul>
        </div>
        <div>
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
        <div>
          <div className={styles.info_heading}>
            <img src={calendarIcon} alt="Date icon" />
            <h3 className={styles.info_title}>Release date</h3>
          </div>
          <p>{game.released}</p>
        </div>
        <div>
          <div className={styles.info_heading}>
            <img src={ratingIcon} alt="Rating icon" />
            <h3 className={styles.info_title}>Rating</h3>
          </div>
          <p>{game.rating}</p>
        </div>
      </div>
      <div className={styles.description_container}>
        <div className={styles.info_heading}>
          <img src={notesIcon} alt="Notes icon" />
          <h3 className={`${styles.info_title} ${styles.text_center}`}>
            Description
          </h3>
        </div>
        <p className={styles.description_paragraph}>{game.description}</p>
      </div>
    </div>
  );
};

export default Mobile;
