import React from "react";
import { FilterButton, SortBy } from "../index";
import { useDispatch } from "react-redux";
import { clearAllFilters } from "../../redux/actions";

const FilterSortSection = ({ handlePageChange }) => {
  const dispatch = useDispatch();

  return (
    <section>
      <FilterButton handlePageChange={handlePageChange} />
      <SortBy handlePageChange={handlePageChange} />
      <button onClick={() => dispatch(clearAllFilters())}>
        Clear All Filters
      </button>
    </section>
  );
};

export default FilterSortSection;
