import React, { useState } from "react";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { dbService, storageService } from "libs/firebase";
import { deleteObject, ref } from "firebase/storage";
import anonymous from "assets/image/anonymous.png";
import {
  NweetButtonArea,
  PreviewArea,
  ProfileBox,
  StyledNweet,
  StyledNweetsArea,
  StyledUpdateChatBox,
  StyledUpdateForm,
} from "styles/NweetStyles";

function Nweet({ nweetObj, isCurrentUser, useObj }) {
  const {
    author: { userName, photoURL },
    text,
    createdAt,
    id,
  } = nweetObj;
  const nweetRef = doc(dbService, "tweets", nweetObj.id);
  const [updateNweet, setUpdateNweet] = useState(nweetObj.text);
  const [updateEditor, setUpdateEditor] = useState(false);

  const handleRemoveNweet = async () => {
    const confirm = window.confirm("정말 이 nweet을 삭제하시겠어요?");
    if (confirm) {
      await deleteDoc(nweetRef);
      const urlRef = ref(storageService, nweetObj.imgFileURL);
      await deleteObject(urlRef);
    }
  };
  const toggleUpdateState = () => setUpdateEditor((prev) => !prev);
  const onChangeNewNweet = ({ target: { value } }) => {
    setUpdateNweet(value);
  };
  const handleUpdateNweet = (event) => {
    event.preventDefault();
    updateDoc(nweetRef, { text: updateNweet });
    setUpdateEditor(false);
  };
  return (
    <>
      {updateEditor && (
        <StyledUpdateForm onSubmit={handleUpdateNweet}>
          <StyledUpdateChatBox
            type='text'
            value={updateNweet}
            onChange={onChangeNewNweet}
          />
          <div>
            <input type='button' value='취소하기' onClick={toggleUpdateState} />
            <input type='submit' value='수정하기' onClick={handleUpdateNweet} />
          </div>
        </StyledUpdateForm>
      )}
      <StyledNweetsArea>
        <div>
          <div>
            <ProfileBox>
              {photoURL === null ? (
                <img src={anonymous} alt={`${userName} 프로필 이미지`} />
              ) : (
                <img src={photoURL} alt={`${userName} 프로필 이미지`} />
              )}
            </ProfileBox>
          </div>
          <StyledNweet>
            <strong>{userName}</strong>
            <span>{createdAt}</span>
            <p>{text}</p>
            {nweetObj.imgFileURL && (
              <PreviewArea>
                <div>
                  <img src={nweetObj.imgFileURL} alt='사진' />
                </div>
              </PreviewArea>
            )}
            {isCurrentUser && (
              <NweetButtonArea>
                <button onClick={handleRemoveNweet}>삭제하기</button>
                <button onClick={toggleUpdateState}>수정하기</button>
              </NweetButtonArea>
            )}
          </StyledNweet>
        </div>
      </StyledNweetsArea>
    </>
  );
}

export default Nweet;
