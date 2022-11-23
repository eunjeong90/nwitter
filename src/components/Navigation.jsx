import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

function Navigation({ useObj }) {
  console.log(useObj);
  return (
    <NavWrap>
      <StyledNav>
        <StyledUl>
          <StyledList>
            <NavLink to='/home'>홈</NavLink>
          </StyledList>
          <StyledList>
            {/* {useObj.photoURL && (
            <img
              src={useObj.photoURL}
              alt={`${useObj.displayName} 프로필 이미지`}
              style={{ width: "25px", height: "25px", borderRadius: "50%" }}
            />
          )} */}
            <NavLink to='/profile'>반가워요, {useObj.displayName} 님😙</NavLink>
          </StyledList>
        </StyledUl>
      </StyledNav>
    </NavWrap>
  );
}

export default Navigation;

const NavWrap = styled.div`
  width: 100%;
`;
const StyledNav = styled.nav`
  width: 598px;
  position: sticky;
  background-color: #fff;
  margin: 0 auto;
  height: 53px;
`;
const StyledUl = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
`;
const StyledList = styled.li`
  line-height: 53px;
  a {
    font-size: 20px;
  }
`;
