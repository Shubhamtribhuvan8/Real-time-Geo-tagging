import React from "react";
import { Link } from "react-router-dom";
import { Button as MuiButton } from "@mui/material";
function NavBar(props) {
  var divStyle = {
    padding: "20px",
    backgroundColor: "black",
    textAlign: "right",
    display: "flex",
    alignItems: "center",
  };
  var aStyle = {
    textAlign: "start",
    color: "white",
    marginRight: "50px",
    textDecoration: "none",
  };
  return (
    <>
      <div style={divStyle}>
        <h1 style={aStyle}>Real time Geo-tagging </h1>
        <Link style={aStyle} to="/home">
          <MuiButton variant="contained" color="success">
            Home
          </MuiButton>
        </Link>
      </div>
    </>
  );
}

export default NavBar;
