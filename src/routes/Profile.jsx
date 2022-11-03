import { authService } from "libs/firebase";
import React from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigation = useNavigate();
  const onLogOut = () => {
    authService.signOut();
    navigation("/");
  };
  return <button onClick={onLogOut}>로그아웃</button>;
}

export default Profile;
