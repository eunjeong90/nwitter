import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../routes/Home";
import Auth from "../routes/Auth";
import Profile from "routes/Profile";
import Layout from "./Layout";

function AppRouter({ isLoggedIn, useObj, refreshUser }) {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        {isLoggedIn ? (
          <>
            <Route element={<Layout useObj={useObj} />}>
              <Route path='home' element={<Home useObj={useObj} />} />
              <Route
                path='profile'
                element={<Profile useObj={useObj} refreshUser={refreshUser} />}
              />
            </Route>
          </>
        ) : (
          <Route path='/' element={<Auth />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
