import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "../routes/Home";
import Auth from "../routes/Auth";
import Navigation from "./Navigation";
import Profile from "routes/Profile";

function AppRouter({ isLoggedIn, useObj }) {
  return (
    <BrowserRouter>
      {isLoggedIn && <Navigation useObj={useObj} />}
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path='/home' element={<Home useObj={useObj} />}></Route>
            <Route
              path='/profile'
              element={<Profile useObj={useObj} />}
            ></Route>
          </>
        ) : (
          <Route path='/' element={<Auth />}></Route>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
