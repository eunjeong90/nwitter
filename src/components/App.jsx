import React, { useEffect, useState } from "react";
import AppRouter from "./Router";
import { authService } from "libs/firebase";
import { onAuthStateChanged } from "firebase/auth";

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
      }
      setFirebaseInit(true);
    });
  }, []);
  return (
    <AppRouter
      useObj={useObj}
      isLoggedIn={isLoggedIn}
      setIsLoggedIn={setIsLoggedIn}
    />
  );
}

export default App;
