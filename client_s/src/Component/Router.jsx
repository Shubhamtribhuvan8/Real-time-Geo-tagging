import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Login_Signup/Login";
export default function Routers() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route
          path="/transaction-details/:transactionId"
          element={<SingleTransaction />}
        /> */}
      </Routes>
    </div>
  );
}
