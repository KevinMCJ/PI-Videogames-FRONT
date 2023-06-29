import { useEffect, useState } from "react";
import {
  CardsContainer,
  SearchBar,
  FilterButton,
  SortBy,
  Pagination,
} from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { clearAllFilters } from "../../redux/actions";

const Home = () => {
  const dispatch = useDispatch();
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
    <div>
      <SearchBar handlePageChange={handlePageChange} />
      {/* // ! Despues separar este div en un componente para que quede mas bonito */}
      <div>
        <FilterButton handlePageChange={handlePageChange} />
        <SortBy handlePageChange={handlePageChange} />
        <button onClick={() => dispatch(clearAllFilters())}>
          Clear All Filters
        </button>
      </div>
      <CardsContainer videogames={gamesToDisplay} />
      {/* 
       // * Si la cantidad de juegos mostrados no son mas que para completar una pagina
       // * No renderiza el paginado */}
      {videogames.length > gamesPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default Home;
