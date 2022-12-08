import React from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Home from "../routes/Home";
import Auth from "../routes/Auth";
import Profile from "routes/Profile";
import Layout from "./Layout";
import GiphyBox from "./GiphyModal";
import GiphyItems from "./GiphyItems";

function AppRouter({ isLoggedIn, useObj, refreshUser }) {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        {isLoggedIn ? (
          <>
            <Route element={<Layout useObj={useObj} />}>
              <Route path='/' element={<Home useObj={useObj} />}>
                <Route path='/foundmedia' element={<GiphyBox />}>
                  <Route path='/foundmedia/search' element={<GiphyItems />} />
                </Route>
              </Route>
              <Route
                path='/profile'
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
