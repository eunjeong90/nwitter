import React, { useEffect, useState } from "react";
import { dbService } from "libs/firebase";
import {
  addDoc,
  getDocs,
  collection,
  doc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import Nweet from "components/Nweet";

function Home({ useObj }) {
  const [nweet, setNweet] = useState("");
  const [nweetResult, setNweetResult] = useState([]);
  const { displayName, uid } = useObj;

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
    try {
      const nweetPost = await addDoc(collection(dbService, "tweets"), {
        text: nweet,
        createdAt: new Date().toLocaleString(),
        userName: uid,
      });
      setNweet("");
      console.log("Document written with ID: ", nweetPost.id);
      console.log(`onsubmit ${nweet}`);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  const onChange = ({ target: { value } }) => {
    setNweet(value);
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
        <input type='submit' value='트윗하기' />
      </form>
      {nweetResult.map((post) => (
        <Nweet key={post.id} nweetObj={post} />
      ))}
    </div>
  );
}

export default Home;
