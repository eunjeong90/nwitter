import React, { useRef, useState } from "react";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { dbService, storageService } from "libs/firebase";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function NweetCreateForm({ useObj }) {
  const { displayName, uid } = useObj;
  const [nweet, setNweet] = useState("");
  const [imgFile, setImgFile] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    let imgFileURL = "";
    if (imgFile !== "") {
      const imgFileRef = ref(storageService, `${uid}/${uuidv4()}`);
      await uploadString(imgFileRef, imgFile, "data_url");
      imgFileURL = await getDownloadURL(imgFileRef);
    }
    const nweetObj = {
      text: nweet,
      createdAt: new Date().toLocaleString(),
      userName: uid,
      imgFileURL,
    };
    await addDoc(collection(dbService, "tweets"), nweetObj);
    setNweet("");
    setImgFile("");
  };
  const onChange = ({ target: { value } }) => {
    setNweet(value);
  };

  const fileInput = useRef(null);
  const onFileChange = ({ target: { files } }) => {
    const file = files[0];
    const reader = new FileReader();
    reader.onloadend = ({ currentTarget: { result } }) => {
      setImgFile(result);
    };
    reader.readAsDataURL(file);
  };
  const onClearFile = () => {
    fileInput.current.value = null;
    setImgFile(null);
  };

  return (
    <StyledCreateForm onSubmit={onSubmit}>
      <div>
        <ProfileBox>
          {useObj.photoURL && (
            <img
              src={useObj.photoURL}
              alt={`${useObj.displayName} 프로필 이미지`}
            />
          )}
        </ProfileBox>
      </div>
      <div>
        <ChatArea>
          <ChatBox
            value={nweet}
            onChange={onChange}
            type='text'
            name=''
            id=''
            placeholder='무슨 일이 일어나고 있나요?'
            maxLength={120}
          />
        </ChatArea>
        {imgFile && (
          <PreviewArea>
            <div>
              <img
                src={imgFile}
                ref={fileInput}
                alt='첨부파일'
                width='100px'
                height='100px'
              />
              <button onClick={onClearFile}>
                <FontAwesomeIcon icon={faXmark} size='lg' />
              </button>
            </div>
          </PreviewArea>
        )}
        <ButtonArea>
          <div>
            <StyledFileUpload htmlFor='fileUploader'>
              <FontAwesomeIcon icon={faImage} size='5x' />
              <input
                ref={fileInput}
                type='file'
                id='fileUploader'
                accept='image/*'
                onChange={onFileChange}
              />
            </StyledFileUpload>
          </div>
          <input type='submit' value='소식올리기' />
        </ButtonArea>
      </div>
    </StyledCreateForm>
  );
}

export default NweetCreateForm;

const StyledCreateForm = styled.form`
  padding: 0 16px;
  display: flex;
  div {
    &:nth-child(2) {
      width: 100%;
    }
  }
`;
const ProfileBox = styled.div`
  img {
    width: 48px;
    height: 48px;
    border-radius: 50px;
    margin: 0 15px 0 0;
  }
`;
const ChatArea = styled.div`
  display: flex;
`;
const ChatBox = styled.textarea`
  width: 100%;
  border: none;
  font-size: 20px;
  outline: 0;
  resize: none;
  white-space: pre-wrap;
  height: auto;
  margin-top: 12px;
`;
const PreviewArea = styled.div`
  all: unset;
  position: relative;
  div {
    width: 100%;
    max-height: 670px;
  }
  img {
    border-radius: 10px;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  button {
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    width: 25px;
    height: 25px;
    position: absolute;
    top: 10px;
    left: 10px;
  }
  svg {
    color: white;
  }
`;
const StyledFileUpload = styled.label`
  input {
    display: none;
  }
`;
const ButtonArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  input[type="submit"] {
    border: none;
    background-color: #f59e4d;
    color: white;
    width: 90px;
    height: 36px;
    font-size: 15px;
    font-weight: bold;
    border-radius: 20px;
    line-height: 36px;
  }
  svg {
    color: #f59e4d;
  }
`;
