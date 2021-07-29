import React, { createContext, useContext, useEffect, useState } from "react";
import { useFirebase } from "../firebase";
import { useCollection } from "../hooks/useCollection.js";

export const AuthContext = createContext({
  user: null,
  ready: null,
});

export const AuthUserProvider = ({ children }) => {
  const { readDoc } = useCollection("/user");
  let [state, setState] = useState({
    ready: null,
    user: null,
  });
  let { auth } = useFirebase();
  useEffect(() => {
    if (!auth) {
      return;
    }
    const subscribe = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        console.log(authUser);
        const userCred = await readDoc(authUser.email);
        setState({ ready: true, user: userCred });
      } else {
        setState({ ready: false, user: null });
      }
    });
    return () => subscribe();
  }, [auth]);

  return (
    <AuthContext.Provider value={{ ...state }}>{children}</AuthContext.Provider>
  );
};
