import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

function Header({ useObj }) {
  console.log(useObj);
  return (
    <NavWrap>
      <StyledNav>
        <StyledUl>
          <StyledList>
            <span>홈</span>
          </StyledList>
          <StyledList>
            <NavLink to='/profile'>반가워요, {useObj.displayName} 님😙</NavLink>
          </StyledList>
        </StyledUl>
      </StyledNav>
    </NavWrap>
  );
}

export default Header;

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
  span,
  a {
    font-size: 20px;
  }
`;
