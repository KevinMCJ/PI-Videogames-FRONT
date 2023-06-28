import { useEffect } from "react";
import { CardsContainer, SearchBar } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { getVideogames } from "../../redux/actions";

const Home = () => {
  const dispatch = useDispatch();
  const videogames = useSelector((state) => state.copyGames);

  useEffect(() => {
    dispatch(getVideogames());
  }, [dispatch]);

  // ? Despues pasarle a CardsContainer const gamesToDisplay
  return (
    <div>
      <SearchBar />
      <CardsContainer videogames={videogames} />
    </div>
  );
};

export default Home;
