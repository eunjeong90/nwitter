import React from "react";
import ReactDOM from "react-dom/client";
import App from "components/App";
import GlobalStyles from "styles/GlobalStyle";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GlobalStyles />
    <App />
  </React.StrictMode>
);
