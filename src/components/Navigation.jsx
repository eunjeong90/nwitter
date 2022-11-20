import React from "react";
import { NavLink } from "react-router-dom";

function Navigation({ useObj }) {
  console.log(useObj);
  return (
    <nav>
      <ul>
        <li>
          <NavLink to='/home'>home</NavLink>
        </li>
        <li>
          <NavLink to='/profile'>{useObj.displayName}님의 프로필</NavLink>
          {useObj.photoURL && (
            <img
              src={useObj.photoURL}
              alt={`${useObj.displayName} 프로필 이미지`}
              style={{ width: "25px", height: "25px", borderRadius: "50%" }}
            />
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
