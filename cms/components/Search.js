import React, { useRef, useState } from "react";

const Search = ({ onSubmit }) => {
  const [search, setsearch] = useState("");
//   does not change between renders
  const typingTimeoutRef = useRef(null);
  function handleSearchTermChange(e) {
      const value=e.target.value ;
    setsearch(e.target.value);
    if (!onSubmit) return;

    // clear timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    // setTimeOut can not use e.target.value
    typingTimeoutRef.current = setTimeout(() => {
      const formValues = {
        search: value,
      };
      onSubmit(formValues);
    }, 500);
  }

  return (
    <form>
      <input
        type="text"
        value={search}
        onChange={handleSearchTermChange}
        placeholder="Search"
        style={{ width: "100px" }}
      />
    </form>
  );
};

export default Search;
