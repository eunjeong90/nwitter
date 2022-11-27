import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseUser, faUser } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

function Navigation() {
  return (
    <StyledNav>
      <ul>
        <li>
          <Link to='/home'>
            <IconBox>
              <FontAwesomeIcon icon={faHouseUser} size='6x' />
            </IconBox>
            <span>홈</span>
          </Link>
        </li>
        <li>
          <Link to='/profile'>
            <IconBox>
              <FontAwesomeIcon icon={faUser} size='6x' />
            </IconBox>
            <span>프로필</span>
          </Link>
        </li>
      </ul>
    </StyledNav>
  );
}

export default Navigation;

const StyledNav = styled.nav`
  /* position: fixed; */
  border-right: 1px solid rgb(239, 243, 244);
  height: 100%;
  width: 230px;
  ul {
    padding: 38px 12px 12px 12px;
  }
  li {
    padding: 12px;
  }
  a {
    display: flex;
    align-items: end;
    transition-duration: 0.2s;
    width: 100%;
    padding: 12px 20px;
    border-radius: 50px;
    &:hover {
      background-color: rgba(15, 20, 25, 0.1);
    }
  }
  span {
    font-size: 20px;
    margin-left: 20px;
  }
`;
const IconBox = styled.div`
  width: 26px;
  height: 23px;
  display: flex;
  flex-flow: column;
  align-items: center;
`;
