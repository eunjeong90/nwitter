import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { authService, dbService } from "libs/firebase";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Profile({ useObj }) {
  const navigation = useNavigate();
  const onLogOut = () => {
    authService.signOut();
    navigation("/");
  };

  const getMyNweets = async () => {
    const q = query(
      collection(dbService, "tweets"),
      where("userName", "==", useObj.uid),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
    });
  };
  useEffect(() => {
    getMyNweets();
  }, []);

  return <button onClick={onLogOut}>로그아웃</button>;
}

export default Profile;
