import React, { useState } from "react";
import { RiSearchLine } from "react-icons/ri";

function SearchForm({ searchFor }) {
  console.debug("SearchForm", "searchFor=", typeof searchFor);
  const [searchTerm, setSearchTerm] = useState("");

  function handleSubmit(evt) {
    evt.preventDefault();
    searchFor(searchTerm.trim() || undefined);
    setSearchTerm(searchTerm.trim());
  }

  function handleChange(evt) {
    setSearchTerm(evt.target.value);
  }

  return (
      <div className="mb-4">
        <form className="form-inline" onSubmit={handleSubmit}>
          <input
              className="form-control form-control-lg flex-grow-1"
              name="searchTerm"
              placeholder="Enter search term.."
              value={searchTerm}
              onChange={handleChange}
          />
          <button type="submit" className="btn btn-secondary text-warning  float-right">
           <h4><RiSearchLine /></h4>
          </button>
        </form>
      </div>
  );
}

export default SearchForm;
