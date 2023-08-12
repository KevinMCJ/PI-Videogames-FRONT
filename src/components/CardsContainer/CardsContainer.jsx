import React from "react";
import { Card, LoadingSpinner } from "../index";
import styles from "./CardsContainer.module.css";
import { useSelector } from "react-redux";

const CardsContainer = ({ videogames }) => {
  const isLoading = useSelector((state) => state.app.isLoading);

  return (
    <section className={styles.container}>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {videogames && videogames.length ? (
            videogames.map((game) => <Card key={game.id} game={game} />)
          ) : (
            <h3 className={styles.no_matches}>No results found... ☹️</h3>
          )}
        </>
      )}
    </section>
  );
};

export default CardsContainer;
