import React, { createContext, useState } from "react";

export const ModalContext = createContext();

function ModalContextProvider({ children }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        showModal,
        setShowModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export default ModalContextProvider;
