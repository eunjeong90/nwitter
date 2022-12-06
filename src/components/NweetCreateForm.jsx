import React, { useRef, useState } from "react";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { dbService, storageService } from "libs/firebase";
import { v4 as uuidv4 } from "uuid";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import anonymous from "assets/image/anonymous.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faFaceSmile } from "@fortawesome/free-regular-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import {
  ButtonArea,
  ChatArea,
  ChatBox,
  PreviewArea,
  ProfileBox,
  StyledCreateForm,
  StyledEmojiButton,
  StyledEmojiPopup,
  StyledFileUpload,
} from "styles/NweetStyles";
import GiphyBox from "./GiphyBox";

function NweetCreateForm({ useObj }) {
  const { displayName, uid, photoURL } = useObj;
  const [nweet, setNweet] = useState("");
  const [imgFile, setImgFile] = useState("");
  const [showEmojis, setShowEmojis] = useState(false);
  const [showGiphy, setShowGiphy] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    let imgFileURL = "";
    // console.log(`imgFile: ${imgFile}`);
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
    setShowEmojis(false);
    setNweet("");
    setImgFile("");
    setShowGiphy(false);
  };
  const onChange = ({ target: { value } }) => {
    setNweet(value);
  };
  const addEmoji = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setNweet(nweet + emoji);
  };

  const fileInput = useRef(null);
  const onFileChange = ({ target: { files } }) => {
    const file = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = ({ currentTarget: { result } }) => {
      setImgFile(result);
    };
  };

  const onClearFile = () => {
    fileInput.current.value = null;
    setImgFile(null);
  };
  return (
    <>
      <StyledCreateForm onSubmit={onSubmit}>
        <div>
          <ProfileBox>
            {useObj.photoURL === null ? (
              <img src={anonymous} alt={`${displayName} 프로필 이미지`} />
            ) : (
              <img src={photoURL} alt={`${displayName} 프로필 이미지`} />
            )}
          </ProfileBox>
        </div>
        <div>
          <ChatArea>
            <ChatBox
              value={nweet}
              onChange={onChange}
              type='text'
              placeholder='무슨 일이 일어나고 있나요?'
              maxLength={120}
            />
            {showEmojis && (
              <StyledEmojiPopup>
                <Picker onSelect={addEmoji} />
              </StyledEmojiPopup>
            )}
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
              <StyledEmojiButton
                onClick={() => setShowEmojis(!showEmojis)}
                type='button'
              >
                <FontAwesomeIcon icon={faFaceSmile} size='lg' />
              </StyledEmojiButton>
              <button type='button' onClick={() => setShowGiphy(!showGiphy)}>
                gif버튼
              </button>
            </div>
            <input type='submit' value='소식올리기' />
          </ButtonArea>
        </div>
      </StyledCreateForm>
      <GiphyBox
        showGiphy={showGiphy}
        imgFile={imgFile}
        setImgFile={setImgFile}
      />
    </>
  );
}

export default NweetCreateForm;
