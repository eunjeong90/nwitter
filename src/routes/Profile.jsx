import { updateProfile } from "firebase/auth";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { authService, dbService } from "libs/firebase";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile({ useObj, refreshUser }) {
  const navigation = useNavigate();
  const [nickValue, setNickValue] = useState("");
  const profileImgInput = useRef(null);
  const [imgFile, setImgFile] = useState("");

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
  const updateProfileSubmit = async (event) => {
    event.preventDefault();
    if (useObj.displayName !== nickValue) {
      await updateProfile(useObj, {
        displayName: nickValue,
      });
      refreshUser();
    }
  };

  const onFileChange = ({ target: { files } }) => {
    const file = files[0];
    const reader = new FileReader();
    reader.onloadend = ({ currentTarget: { result } }) => {
      setImgFile(result);
    };
    reader.readAsDataURL(file);
  };
  return (
    <>
      <form onSubmit={updateProfileSubmit}>
        <input
          type='text'
          onChange={nickValueOnChange}
          value={nickValue}
          maxLength={20}
          placeholder='사용할 닉네임'
        />
        <input
          ref={profileImgInput}
          type='file'
          accept='image/*'
          onChange={onFileChange}
        />
        <input type='submit' value='프로필 업데이트' />
      </form>
      <button onClick={onLogOut}>로그아웃</button>
    </>
  );
}

export default Profile;
