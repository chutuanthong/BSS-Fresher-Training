import React, { useEffect, useState } from "react";

function Nav ({ handleClickHamburger }){
  
  const [user, setUser] = useState("")

  useEffect(() => {
    
    setUser(localStorage.getItem("user"));
    
  }, [])

  return (
    <div>
      <div className="header">
        <div className="menu-btn">
          <div className="menu-btn__burger" onClick={handleClickHamburger} />
        </div>
        <div className="header-user">
          <i className="fas fa-user" />
          <div className="header-user-name">{user}</div>
        </div>
      </div>
    </div>
  );  
};

export default Nav;
