import React from 'react';
import { Link } from "react-router-dom";
function Header() {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };
  const username = localStorage.getItem("username");
  return (
    <header>
      <div className="logo">
        <Link
          to="/"
          className="text-deco color-white fsize-header font-spacing" > 
          SERGIO 
          </Link>
      </div>
      <nav>
      <ul>
      <li>
        <Link to="/products">
          <img src="src\icons\shirt icon.png" alt="Products" className="nav-icon" />
        </Link>
      </li>
      <li>
        <Link to="/orders"> 
          <img src="src\icons\order.png" alt="Orders" className="nav-icon" />
        </Link>
      </li>
      <li>
        <a onClick={handleLogout} className="text-deco nav-label font-primary onHover">
          {username ? username : "Login/Register"}
        </a>
      </li>
    </ul>
      </nav>
    </header>
  );
}
export default Header;
