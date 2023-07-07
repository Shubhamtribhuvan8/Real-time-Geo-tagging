import React from "react";
import "./UI.css";
import Login from "../Login_Signup/Login";

const UI = () => {
  return (
    <section>
      <div className="container">
        <div className="content">
          <div className="menu">
            <button>
              <ion-icon name="menu-outline"></ion-icon>
            </button>
          </div>

          <div className="row">
            <div className="profile">
              <h1 className="name">Real Time Geo-Tagging</h1>
              <Login />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UI;
