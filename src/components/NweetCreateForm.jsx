import React, { useRef, useState } from "react";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { dbService, storageService } from "libs/firebase";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";

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
      <ChatArea>
        {useObj.photoURL && (
          <img
            src={useObj.photoURL}
            alt={`${useObj.displayName} 프로필 이미지`}
          />
        )}
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
        <div>
          <img
            src={imgFile}
            ref={fileInput}
            alt='첨부파일'
            width='100px'
            height='100px'
          />
          <button onClick={onClearFile}>초기화</button>
        </div>
      )}
      <input
        ref={fileInput}
        type='file'
        accept='image/*'
        onChange={onFileChange}
      />
      <input type='submit' value='트윗하기' />
    </StyledCreateForm>
  );
}

export default NweetCreateForm;

const StyledCreateForm = styled.form`
  padding: 0 16px;
`;
const ChatArea = styled.div`
  display: flex;
  img {
    width: 48px;
    height: 48px;
    border-radius: 50px;
    margin: 0 15px 0 0;
  }
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
