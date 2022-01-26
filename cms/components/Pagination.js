import React, { useState } from "react";
import PropTypes from "prop-types";

Pagination.propTypes = {
  pagination: PropTypes.object.isRequired,
  onPageChange: PropTypes.func,
};

Pagination.defaultProps = {
  onPageChange: null,
};

function Pagination(props) {
  const { pagination, onPageChange } = props;
  const { _limit, _page, _totalRows } = pagination || {};
  const totalPages = Math.ceil(_totalRows / _limit);
  let numberPages = [];
  for (let i = 0; i < totalPages; ++i) numberPages.push(i);

  // call onPageChange from parent
  const handlerPageChange = (newPage) => {
    console.log("handlerPageChange :", newPage);
    if (onPageChange) {
      onPageChange(newPage);
    }
  };

  // Khi click nút prev nếu page =1 thì quay về trang cuối
  // Khi click nút next nếu page = trang cuối  thì quay về trang đầu
  // disabled khi total page = 1
  return (
    <div>
      <button
        className="btn--prev"
        disabled={totalPages === 1}
        onClick={() =>
          handlerPageChange(((_page - 1 - 1 + totalPages) % totalPages) + 1)
        }
      >
        Prev
      </button>
      {numberPages.map((value) => (
        <button
          className="btn--numberPage"
          onClick={() => handlerPageChange(value + 1)}
          style={{ color: value + 1 === _page ? "white" : "black" }}
          key={value + 1}
        >
          {value + 1}
        </button>
      ))}
      <button
        className="btn--next"
        disabled={totalPages === 1}
        onClick={() => handlerPageChange((_page % totalPages) + 1)}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
