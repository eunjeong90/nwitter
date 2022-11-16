import React, { useEffect, useRef, useState } from "react";
import { dbService, storageService } from "libs/firebase";
import {
  addDoc,
  getDocs,
  collection,
  doc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import Nweet from "components/Nweet";

function Home({ useObj }) {
  const { displayName, uid } = useObj;
  const [nweet, setNweet] = useState("");
  const [nweetResult, setNweetResult] = useState([]);
  const [imgFile, setImgFile] = useState("");

  useEffect(() => {
    const q = query(
      collection(dbService, "tweets"),
      orderBy("createdAt", "desc")
    );
    onSnapshot(q, (snapshot) => {
      const nweetArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweetResult(nweetArr);
    });
  }, []);

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
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={nweet}
          onChange={onChange}
          type='text'
          name=''
          id=''
          placeholder='무슨 일이 일어나고 있나요?'
          maxLength={120}
        />
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
      </form>
      {nweetResult.map((post) => (
        <Nweet
          key={post.id}
          nweetObj={post}
          isCurrentUser={post.userName === useObj.uid}
        />
      ))}
    </div>
  );
}

export default Home;
