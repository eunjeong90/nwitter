import React from "react";
import styled from "styled-components";
import Navigation from "./Navigation";

function Layout() {
  return (
    <Wrapper>
      <Navigation />
      <ContentBox>{children}</ContentBox>
    </Wrapper>
  );
}

export default Layout;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;
const ContentBox = styled.div`
  width: 598px;
  height: 100%;
`;
