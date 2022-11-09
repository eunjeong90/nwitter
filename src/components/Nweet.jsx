import React from "react";

function Nweet({ nweetObj }) {
  return (
    <div>
      <p>{nweetObj.text}</p>
      <p>{nweetObj.userName}</p>
      <p>{nweetObj.createdAt}</p>
      <button>삭제하기</button>
      <button>수정하기</button>
    </div>
  );
}

export default Nweet;
