import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Login_Signup/Login";
import PostComponent from "./ImageUpload/Post";
export default function Routers() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/imagepost" element={<PostComponent />} />
      </Routes>
    </div>
  );
}
