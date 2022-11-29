import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import Home from "../routes/Home";
import Auth from "../routes/Auth";
import Profile from "routes/Profile";
import Layout from "./Layout";

function AppRouter({ isLoggedIn, useObj, refreshUser }) {
  return (
    <BrowserRouter>
      <Routes>
        {!isLoggedIn ? (
          <Route path='/' element={<Auth />} />
        ) : (
          <>
            <Route element={<Layout useObj={useObj} />}>
              <Route path='home' element={<Home useObj={useObj} />} />
              <Route
                path='profile'
                element={<Profile useObj={useObj} refreshUser={refreshUser} />}
              />
            </Route>
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
