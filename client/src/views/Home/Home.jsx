import { useEffect } from "react";
import {
  CardsContainer,
  SearchBar,
  FilterButton,
  SortBy,
} from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { getVideogames, getGenres, clearAllFilters } from "../../redux/actions";

const Home = () => {
  const dispatch = useDispatch();
  const videogames = useSelector((state) => state.copyGames);

  useEffect(() => {
    dispatch(getGenres());
    dispatch(getVideogames());
  }, [dispatch]);

  // ? Despues pasarle a CardsContainer also como gamesToDisplay para un paginado.
  return (
    <div>
      {/* // * Despues separar este div en un componente para que quede mas bonito */}
      <div>
        <FilterButton />
        <SortBy />
        <button onClick={() => dispatch(clearAllFilters())}>
          Clear All Filters
        </button>
      </div>
      <SearchBar />
      <CardsContainer videogames={videogames} />
    </div>
  );
};

export default Home;
