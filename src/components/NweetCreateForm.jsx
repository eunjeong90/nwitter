import React, { useRef, useState } from "react";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { dbService, storageService } from "libs/firebase";
import { v4 as uuidv4 } from "uuid";
import EmojiPicker from "emoji-picker-react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import {
  ButtonArea,
  ChatArea,
  ChatBox,
  PreviewArea,
  ProfileBox,
  StyledCreateForm,
  StyledFileUpload,
} from "styles/NweetStyles";

function NweetCreateForm({ useObj }) {
  const { displayName, uid, photoURL } = useObj;
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
      userId: uid,
      imgFileURL,
      author: {
        userName: displayName,
        photoURL: photoURL,
      },
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
            {/* <EmojiPicker /> */}
          </div>
          <input type='submit' value='소식올리기' />
        </ButtonArea>
      </div>
    </StyledCreateForm>
  );
}

export default NweetCreateForm;
