import React, { useState } from "react";
import { FilterOptions } from "../../index";

const FilterButton = ({ handlePageChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)}>Filter By</button>
      {isOpen && (
        <FilterOptions
          setIsOpen={setIsOpen}
          handlePageChange={handlePageChange}
        />
      )}
    </>
  );
};

export default FilterButton;
