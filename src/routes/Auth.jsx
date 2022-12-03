import React from "react";
import { authService } from "libs/firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
} from "firebase/auth";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faFacebook,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import AuthForm from "components/AuthForm";

function Auth() {
  const onSocialSubmitClick = ({ target: { name } }) => {
    let providerData;
    if (name === "google") {
      providerData = new GoogleAuthProvider();
    } else if (name === "facebook") {
      providerData = new FacebookAuthProvider();
      providerData.setCustomParameters({
        display: "popup",
      });
    }
    signInWithPopup(authService, providerData);
  };
  return (
    <AuthWrap>
      <InnerBox>
        <span>
          <FontAwesomeIcon icon={faTwitter} size='9x' />
        </span>
        <strong>로그인하기</strong>
        <FormBox>
          <SocialBtn name='google' onClick={onSocialSubmitClick}>
            <FontAwesomeIcon icon={faGoogle} size='lg' />
            Google로 로그인하기
          </SocialBtn>
          <SocialBtn name='facebook' onClick={onSocialSubmitClick}>
            <FontAwesomeIcon icon={faFacebook} size='lg' />
            Facebook으로 로그인하기
          </SocialBtn>
          <span>또는</span>
          <AuthForm />
        </FormBox>
      </InnerBox>
    </AuthWrap>
  );
}

export default Auth;

const AuthWrap = styled.div`
  width: 100%;
  height: 100vh;
  background: rgb(29, 155, 240);
  margin: 0 auto;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
`;
const InnerBox = styled.div`
  width: 600px;
  background: #fff;
  padding: 40px;
  text-align: center;
  border-radius: 15px;
  span {
    display: block;
    margin-bottom: 20px;
    svg {
      color: rgb(29, 155, 240);
    }
  }
  strong {
    font-size: 31px;
    font-weight: bold;
    margin: 10px 0;
  }
`;
const SocialBtn = styled.button`
  width: 300px;
  height: 40px;
  font-size: 15px;
  border: 1px solid rgb(207, 217, 222);
  border-radius: 20px;
  font-weight: bold;
  margin: 10px;
  > svg {
    margin-right: 5px;
  }
`;
const FormBox = styled.div`
  margin: 20px;
  > span {
    font-size: 17px;
    margin: 15px 0 20px 0;
    position: relative;
    &::before {
      content: "";
      position: absolute;
      width: 22%;
      left: 93px;
      top: 50%;
      border: 1px solid lightgray;
    }
    &::after {
      content: "";
      position: absolute;
      width: 22%;
      right: 93px;
      top: 50%;
      border: 1px solid lightgray;
    }
  }
`;
