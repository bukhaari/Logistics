import React, { createContext, useState } from "react";


export const LoginContext = createContext();
LoginContext.displayName = "LoginContext";

const LoginProvider = (props) => {
  return (
    <LoginContext.Provider value={{}}>{props.children}</LoginContext.Provider>
  );
};

export default LoginProvider;
