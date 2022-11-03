import React from "react";
import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to='/home'>home</NavLink>
        </li>
        <li>
          <NavLink to='/profile'>profile</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
