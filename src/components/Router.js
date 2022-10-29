import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "../routes/Home";
import Auth from "../routes/Auth";

function AppRouter({ isLoggedIn, setIsLoggedIn }) {
  return (
    <BrowserRouter>
      <Routes>
        {isLoggedIn ? (
          <Route path='/' element={<Home />}></Route>
        ) : (
          <Route path='/' element={<Auth />}></Route>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
