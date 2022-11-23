import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
} from "react-router-dom";
import Home from "../routes/Home";
import Auth from "../routes/Auth";
import Navigation from "./Navigation";
import Profile from "routes/Profile";
import Layout from "./Layout";

const CommonLayout = () => {
  <Layout>
    <Outlet />
  </Layout>;
};
function AppRouter({ isLoggedIn, useObj, refreshUser }) {
  return (
    <Router>
      {isLoggedIn && <Navigation useObj={useObj} />}
      <Routes>
        {!isLoggedIn ? (
          <Route path='/' element={<Auth />} />
        ) : (
          <>
            {/* <Route element={<CommonLayout />}> */}
            <Route path='/home' element={<Home useObj={useObj} />} />
            <Route
              path='/profile'
              element={<Profile useObj={useObj} refreshUser={refreshUser} />}
            />
            {/* </Route> */}
          </>
        )}
      </Routes>
    </Router>
  );
}

export default AppRouter;
