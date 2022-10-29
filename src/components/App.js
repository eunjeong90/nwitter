import React, { useState } from "react";
import AppRouter from "./Router";
import { authService } from "../libs/firebase";
import GlobalStyles from "../styles/GlobalStyle";

function App() {
  const isAuthCurrent = authService.currentUser;
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthCurrent);
  return <AppRouter isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />;
}

export default App;
