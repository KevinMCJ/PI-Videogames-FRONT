import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Landing, Home, Detail, Form, Error } from "./views";
import { NavBar, CustomAlert } from "./components";
import { useDispatch, useSelector } from "react-redux";
import {
  getGenres,
  getPlatforms,
  getVideogames,
  setLoading,
} from "./redux/actions/appActions";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const alert = useSelector((state) => state.utils.alert);

  // * Carga inicial de los datos necesarios para la app.
  useEffect(() => {
    dispatch(setLoading(true));
    Promise.all([
      dispatch(getGenres()),
      dispatch(getPlatforms()),
      dispatch(getVideogames()),
    ]).then(() => dispatch(setLoading(false)));
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
      <>
        {alert && (
          <CustomAlert
            message={alert.message}
            time={alert.time}
            status={alert.status}
          />
        )}
      </>
    </div>
  );
}

export default App;
