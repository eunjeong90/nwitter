import { updateProfile } from "firebase/auth";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { authService, dbService } from "libs/firebase";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile({ useObj }) {
  const navigation = useNavigate();
  const [nickValue, setNickValue] = useState("");
  const onLogOut = () => {
    authService.signOut();
    navigation("/");
  };

  const getMyNweets = async () => {
    const q = query(
      collection(dbService, "tweets"),
      where("userName", "==", useObj.uid),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
    });
  };
  useEffect(() => {
    getMyNweets();
  }, []);

  const nickValueOnChange = ({ target: { value } }) => {
    setNickValue(value);
  };
  const updateProfileSubmit = (event) => {
    event.preventDefault();
    if (useObj.displayName !== nickValue) {
      updateProfile(useObj, { displayName: nickValue });
    }
  };

  return (
    <>
      <form onSubmit={updateProfileSubmit}>
        <input
          type='text'
          onChange={nickValueOnChange}
          value={nickValue}
          placeholder='사용할 닉네임'
        />
        <input type='submit' value='프로필 업데이트' />
      </form>
      <button onClick={onLogOut}>로그아웃</button>
    </>
  );
}

export default Profile;
