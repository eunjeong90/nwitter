import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";
import Navigation from "./Navigation";

function Layout({ useObj }) {
  return (
    <CommonLayout>
      <NavWrap>
        <Navigation />
      </NavWrap>
      <Wrapper>
        <ContentBox>
          <Header useObj={useObj} />
          <Outlet />
        </ContentBox>
      </Wrapper>
    </CommonLayout>
  );
}

export default Layout;

const CommonLayout = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 890px;
  margin: 0 auto;
  min-height: 450px;
  height: 100%;
`;
const NavWrap = styled.div`
  display: flex;
`;
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;
const ContentBox = styled.div`
  width: 598px;
  height: 100%;
`;
