import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService, dbService, storageService } from "libs/firebase";
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";

function Profile({ useObj, refreshUser }) {
  const { uid } = useObj;
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
    let imgFileURL = "";
    if (imgFile !== "") {
      const imgFileRef = ref(storageService, `${uid}/${uuidv4()}`);
      await uploadString(imgFileRef, imgFile, "data_url");
      imgFileURL = await getDownloadURL(imgFileRef);
      const profileImgUpdate = {
        imgFileURL,
      };
      await addDoc(collection(dbService, "profileImage"), profileImgUpdate);
    }
    await updateProfile(useObj, {
      displayName: nickValue,
      photoURL: imgFileURL,
    });
    refreshUser();
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
