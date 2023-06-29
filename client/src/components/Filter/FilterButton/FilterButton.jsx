import React, { useState } from "react";
import { FilterOptions } from "../../index";

const FilterButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)}>Filter By</button>
      {isOpen && <FilterOptions setIsOpen={setIsOpen} />}
    </>
  );
};

export default FilterButton;
