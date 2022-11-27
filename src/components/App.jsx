import React, { useEffect, useState } from "react";
import AppRouter from "./Router";
import { authService } from "libs/firebase";
import { onAuthStateChanged, updateCurrentUser } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function App() {
  const [firebaseInit, setFirebaseInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [useObj, setUseObj] = useState(null);

  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUseObj(user);
        if (user.displayName === null) {
          const insertDefaultNickName = "Anonymous";
          user.displayName = insertDefaultNickName;
        }
      } else {
        setIsLoggedIn(false);
        setUseObj(null);
      }
      setFirebaseInit(true);
    });
  }, []);
  const refreshUser = async () => {
    await updateCurrentUser(authService, authService.currentUser);
    setUseObj(authService.currentUser);
  };

  return (
    <AppRouter
      useObj={useObj}
      isLoggedIn={isLoggedIn}
      setIsLoggedIn={setIsLoggedIn}
      refreshUser={refreshUser}
    />
  );
}

export default App;
