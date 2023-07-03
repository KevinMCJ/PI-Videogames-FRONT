import React from "react";

const SelectedOptionsList = ({ arrValues, handleList, listName }) => {
  return (
    <>
      {arrValues.length ? (
        <ul>
          {arrValues.map((value) => (
            <li key={value} onClick={(e) => handleList(e, listName)}>
              {value}
            </li>
          ))}
        </ul>
      ) : (
        <p>Select at least one platform for the game.</p>
      )}
    </>
  );
};

export default SelectedOptionsList;
