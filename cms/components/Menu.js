import React, { useState } from "react";
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Link from "next/link";
import router from "next/router";

// nếu người dùng muốn logout account 
function handlleClickLogOut() {
  var r = confirm("Do you want to logout account ");
  if (r == true) {
    window.localStorage.removeItem("user");
    router.push("/");
  } 
}

function Menu({ displayMenu, linkColor }) {
  return (
    <div>
      <nav className="category" style={{ display: displayMenu }}>
        <h3 className="category__heading">
          <i className="fas fa-archway" />
          Device Manger
        </h3>
        <ul className="category-list">
          <li className="category-item category-item--active">
            <Link href="/dashboard" className="category-item__link">
              <a>
                <i className="fas fa-tachometer-alt" />
                <p style={{ color: linkColor === 0 ? "#f28e19" : "" }}>
                  Dashboard
                </p>
              </a>
            </Link>
          </li>
          <li className="category-item">
            <Link href="/logs" className="category-item__link">
              <a>
                <i className="fas fa-table" />
                <p style={{ color: linkColor === 1 ? "#f28e19" : "" }}>Logs</p>
              </a>
            </Link>
          </li>
          <li className="category-item">
            <Link href="/" className="category-item__link">
              <a>
                <i className="fas fa-cog" />
                Setting
              </a>
            </Link>
          </li>
          <li className="category-item ">
            <button
              className="category-item__link category-signout"
              onClick={handlleClickLogOut}
            >
              <i className="fas fa-sign-out-alt"></i>
              sign-out
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Menu;
