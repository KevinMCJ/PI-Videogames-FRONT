import { useEffect } from "react";
import { Routes, Route, useLocation} from "react-router-dom";
import { Landing, Home, Detail, Form, Error } from "./views";
import { NavBar } from "./components";
import { useDispatch } from "react-redux";
import { getGenres, getPlatforms, getVideogames, setLoading } from "./redux/actions";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  // * Carga inicial de los datos necesarios para la app.
  useEffect(() => {
    dispatch(setLoading(true));
    dispatch(getGenres());
    dispatch(getPlatforms());
    dispatch(getVideogames()).then(() => dispatch(setLoading(false)));
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
