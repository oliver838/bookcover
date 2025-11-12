import React from "react";
import { createContext } from "react";
import { useState } from "react";

export const MyUserContext = createContext();
export const MyUserProvider = ({ children }) => {
  const [user, setUser] = useState({ name: "Gyula" });

  return (
    <div>
      <MyUserContext.Provider value={{ user }}>
        {children}
      </MyUserContext.Provider>
    </div>
  );
};
