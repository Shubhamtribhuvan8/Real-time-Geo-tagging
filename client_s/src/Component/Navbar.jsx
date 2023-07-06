import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <div>
      <header className="navbar">
        <div className="navbar__title navbar__item">
          <img
            style={{ height: "46px" }}
            src="https://cdn-icons-png.flaticon.com/512/2775/2775994.png"
            alt=""
          />
          <h6>Real Time Geo-tagging App</h6>
        </div>

        <Link to={"/home"} className="navbar__link">
          <div className="navbar__item">HOME</div>
        </Link>
        <Link to={"/home"} className="navbar__link">
          <div className="navbar__item">GEO-LOCATION</div>
        </Link>
      </header>
    </div>
  );
}
