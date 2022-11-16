import React, { useState } from "react";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { dbService, storageService } from "libs/firebase";
import { deleteObject, ref } from "firebase/storage";

function Nweet({ nweetObj, isCurrentUser }) {
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
        <form onSubmit={handleUpdateNweet}>
          <input type='text' value={updateNweet} onChange={onChangeNewNweet} />
          <input type='submit' value='수정하기' onClick={handleUpdateNweet} />
          <input type='button' value='취소하기' onClick={toggleUpdateState} />
        </form>
      )}
      <div>
        <p>{nweetObj.text}</p>
        <p>{nweetObj.userName}</p>
        <p>{nweetObj.createdAt}</p>
        {nweetObj.imgFileURL && (
          <img
            src={nweetObj.imgFileURL}
            style={{ width: "300px", height: "auto" }}
            alt='사진'
          />
        )}
        {isCurrentUser && (
          <>
            <button onClick={handleRemoveNweet}>삭제하기</button>
            <button onClick={toggleUpdateState}>수정하기</button>
          </>
        )}
      </div>
    </>
  );
}

export default Nweet;
