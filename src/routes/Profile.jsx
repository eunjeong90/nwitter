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
import styled from "styled-components";
import { StyledFileUpload } from "styles/NweetStyles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import anonymous from "assets/image/anonymous.png";

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
    <StyledProfileWrap>
      <form onSubmit={updateProfileSubmit}>
        <ImgPreview>
          <div>
            {useObj.photoURL ? (
              <img
                src={useObj.photoURL}
                alt={`${useObj.displayName} 프로필 이미지`}
              />
            ) : (
              <img src={anonymous} alt='Anonymous' />
            )}
            <StyledFileUpload htmlFor='profileImg'>
              <FontAwesomeIcon icon={faCamera} size='5x' />
              <input
                ref={profileImgInput}
                type='file'
                id='profileImg'
                accept='image/*'
                onChange={onFileChange}
              />
            </StyledFileUpload>
          </div>
        </ImgPreview>
        <StyledInput
          type='text'
          onChange={nickValueOnChange}
          value={nickValue}
          maxLength={20}
          placeholder='사용할 닉네임'
        />
        <StyledSaveInput type='submit' value='저장' />
      </form>
      <StyledLogOutBox>
        <button onClick={onLogOut}>로그아웃</button>
      </StyledLogOutBox>
    </StyledProfileWrap>
  );
}

export default Profile;

const StyledProfileWrap = styled.div`
  padding: 0 16px;
  form {
    position: relative;
    margin: 15px 0;
  }
  input[type="submit"] {
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
  }
  button {
    font-size: 16px;
  }
  img {
    width: 112px;
    height: 112px;
    border-radius: 50%;
  }
`;
const ImgPreview = styled.div`
  div {
    position: relative;
    width: fit-content;
    margin-bottom: 20px;
  }
  label {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.3);
    padding: 10px;
    border-radius: 50%;
  }
  img {
    filter: brightness(50%);
  }
  svg {
    color: white;
  }
`;
const StyledInput = styled.input`
  width: 100%;
  height: 55px;
  border: solid 1px rgb(207, 217, 222);
  border-radius: 5px;
  font-size: 20px;
  padding: 10px;
`;
const StyledSaveInput = styled.input`
  border: none;
  background-color: black;
  color: white;
  font-size: 16px;
  padding: 8px 15px;
  border-radius: 50px;
`;
const StyledLogOutBox = styled.div`
  margin: 20px 0;
  display: flex;
  justify-content: end;
`;
