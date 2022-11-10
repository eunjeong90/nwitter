import React from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { dbService } from "libs/firebase";

function Nweet({ nweetObj, isCurrentUser }) {
  const nweetRef = doc(dbService, "tweets", nweetObj.id);
  const handleRemoveNweet = () => {
    const confirm = window.confirm("정말 이 nweet을 삭제하시겠어요?");
    if (!confirm) {
      return;
    } else {
      deleteDoc(nweetRef);
    }
  };
  return (
    <div>
      <p>{nweetObj.text}</p>
      <p>{nweetObj.userName}</p>
      <p>{nweetObj.createdAt}</p>
      {isCurrentUser && (
        <>
          <button onClick={handleRemoveNweet}>삭제하기</button>
          <button>수정하기</button>
        </>
      )}
    </div>
  );
}

export default Nweet;
