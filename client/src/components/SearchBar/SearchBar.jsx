import { useState } from "react";
import { useDispatch } from "react-redux";
import { getVideogamesByName } from "../../redux/actions.js";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(getVideogamesByName(name));
  };

  return (
    <div>
      <label htmlFor="search">Search By Name</label>
      <div>
        <input
          type="search"
          onChange={handleChange}
          placeholder="Name of a game"
          value={name}
        />
        <button type="button" onClick={handleSubmit}>
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
