import React from "react";
import { Route, Routes } from "react-router-dom";
// import Login from "./Login_Signup/Login";
import PostComponent from "./ImageUpload/Post";
import GetComponent from "./ImageUpload/Get";
import UI from "./UI/Ui";
export default function Routers() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<UI />} />
        <Route path="/imagepost" element={<PostComponent />} />
        <Route path="/home" element={<GetComponent />} />
      </Routes>
    </div>
  );
}
