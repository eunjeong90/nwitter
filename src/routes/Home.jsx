import React, { useEffect, useState } from "react";
import { dbService } from "libs/firebase";
import { addDoc, getDocs, collection } from "firebase/firestore";

function Home() {
  const [nweet, setNweet] = useState("");
  const [nweetResult, setNweetResult] = useState([]);

  const handleGetNweetPost = async () => {
    const getNweetPost = await getDocs(collection(dbService, "tweets"));
    getNweetPost.forEach((post) => {
      const nweetObject = {
        ...post.data(),
        id: post.id,
      };
      setNweetResult((prev) => [nweetObject, ...prev]);
    });
    console.log(nweetResult);
  };
  useEffect(() => {
    handleGetNweetPost();
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const nweetPost = await addDoc(collection(dbService, "tweets"), {
        text: nweet,
        createdAt: Date.now(),
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
        <>
          <div key={post.id}>
            <p>{post.text}</p>
            {/* <p>{post.createdAt}</p> */}
          </div>
        </>
      ))}
    </div>
  );
}

export default Home;
