import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getVideogameById, setLoading } from "../../redux/actions";

const Detail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const game = useSelector((state) => state.game);
  let isLoading = useSelector((state) => state.isLoading);

  useEffect(() => {
    dispatch(setLoading(true));
    dispatch(getVideogameById(id)).then(() => dispatch(setLoading(false)));
  }, [dispatch, id]);

  return (
    <section>
      {isLoading ? (
        <h3>Loading...</h3>
      ) : (
        <div>
          <h1>{game.id}</h1>
          <h2>{game.name}</h2>
          <img src={game.image} alt={`${game.name} cover`} />
          <p>{game.description}</p>
          <p>Release date: {game.released}</p>
          <p>Rating: {game.rating}</p>
          <ul>{game.genres && game.genres.map((genre) => <li>{genre}</li>)}</ul>
        </div>
      )}
    </section>
  );
};

export default Detail;
