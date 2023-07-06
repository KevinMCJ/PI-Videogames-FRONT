import { useEffect, useState } from "react";
import {
  CardsContainer,
  SearchBar,
  Pagination,
  FilterSortSection,
} from "../../components";
import { useSelector } from "react-redux";
import styles from "./Home.module.css";

const Home = () => {
  const videogames = useSelector((state) => state.copyGames);
  const [gamesToDisplay, setGamesToDisplay] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 15;

  // * Logica Paginado
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const totalPages = Math.ceil(videogames.length / gamesPerPage);

  useEffect(() => {
    setGamesToDisplay(videogames.slice(indexOfFirstGame, indexOfLastGame));
  }, [videogames, indexOfFirstGame, indexOfLastGame]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <section className={styles.home_section}>
      <SearchBar handlePageChange={handlePageChange} />
      <FilterSortSection handlePageChange={handlePageChange} />
      <CardsContainer videogames={gamesToDisplay} />
      {/* // * Si la cantidad de juegos mostrados no es suficiente para completar una página, el paginado no se renderiza.*/}
      {videogames.length > gamesPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </section>
  );
};

export default Home;
