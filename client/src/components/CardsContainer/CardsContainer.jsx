import React from "react";
import { Card } from "../index";
import styles from "./CardsContainer.module.css";

const CardsContainer = ({ videogames }) => {
  return (
    <section className={styles.container}>
      {videogames && videogames.length ? (
        videogames.map((game) => <Card key={game.id} game={game} />)
      ) : (
        <h3>Sin coincidencias...</h3>
      )}
    </section>
  );
};

export default CardsContainer;
