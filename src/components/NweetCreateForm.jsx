import React, { useContext, useRef, useState } from "react";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { dbService, storageService } from "libs/firebase";
import { v4 as uuidv4 } from "uuid";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import anonymous from "assets/image/anonymous.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImage,
  faFaceSmile,
  faCirclePlay,
} from "@fortawesome/free-regular-svg-icons";
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
  StyledGifButton,
} from "styles/NweetStyles";
import { useNavigate } from "react-router-dom";
import GiphyBox from "./GiphyModal";
import { ModalContext } from "./modal/modalContext";

function NweetCreateForm({ useObj }) {
  const navigate = useNavigate();
  const { showModal, setShowModal } = useContext(ModalContext);
  const { displayName, uid, photoURL } = useObj;
  const [nweet, setNweet] = useState("");
  const [imgFile, setImgFile] = useState("");
  const [showEmojis, setShowEmojis] = useState(false);

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
              <img src={anonymous} alt={`${displayName} ????????? ?????????`} />
            ) : (
              <img src={photoURL} alt={`${displayName} ????????? ?????????`} />
            )}
          </ProfileBox>
        </div>
        <div>
          <ChatArea>
            <ChatBox
              value={nweet}
              onChange={onChange}
              type='text'
              placeholder='?????? ?????? ???????????? ??????????'
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
                  alt='????????????'
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
              <StyledGifButton
                type='button'
                onClick={() => {
                  navigate("foundmedia");
                  setShowModal(true);
                }}
              >
                <FontAwesomeIcon icon={faCirclePlay} size='lg' />
              </StyledGifButton>
            </div>
            <input type='submit' value='???????????????' />
          </ButtonArea>
        </div>
      </StyledCreateForm>
      <GiphyBox
        imgFile={imgFile}
        setImgFile={setImgFile}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </>
  );
}

export default NweetCreateForm;
