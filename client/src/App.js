import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Landing, Home, Detail, Form, Error } from "./views";
import { NavBar } from "./components";
import { useDispatch } from "react-redux";
import { getGenres, getPlatforms, getVideogames } from "./redux/actions";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  // * Mejor practica para UX y no cargar cada vez que se cambie de ruta.
  useEffect(() => {
    dispatch(getGenres());
    dispatch(getPlatforms());
    dispatch(getVideogames());
  }, [dispatch]);

  return (
    <div className="App">
      {location.pathname !== "/" && <NavBar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/create" element={<Form />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
