import React from "react";
import { authService } from "libs/firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
} from "firebase/auth";
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
    <div>
      <div>
        <button name='google' onClick={onSocialSubmitClick}>
          Google 계정으로 로그인하기
        </button>
        <button name='facebook' onClick={onSocialSubmitClick}>
          Facebook 계정으로 로그인하기
        </button>
        <span>또는</span>
      </div>
      <AuthForm />
    </div>
  );
}

export default Auth;
