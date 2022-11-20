import React, { useEffect, useState } from "react";
import { dbService } from "libs/firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import NweetCreateForm from "components/NweetCreateForm";
import Nweet from "components/Nweet";

function Home({ useObj }) {
  const [nweetResult, setNweetResult] = useState([]);

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

  return (
    <div>
      <NweetCreateForm useObj={useObj} />
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
