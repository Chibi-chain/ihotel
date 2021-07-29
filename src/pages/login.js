import React, { useState } from "react";
import { useHistory } from "react-router";
import { useFirebase } from "../firebase";
import { useCollection } from "../hooks/useCollection";

export const Login = () => {
  const { auth } = useFirebase();
//   const { updateDoc } = useCollection('users');
  const [cred, setCred] = useState({
    email: "",
    password: "",
  });
  const history = useHistory();
  const login = async () => {
    if (cred.email && cred.password && cred.password2) {
      if (cred.password2 == cred.password) {
        auth
          .signInWithEmailAndPassword(cred.email, cred.password)
          .then((user) => {
            console.log(user, "Login success");
            history.push("/");
          })
          .catch((error) => {
            alert(error.message);
          });
      } else {
        alert("password taarku bn");
      }
    } else {
      alert("buglunu uu");
    }
  };

  return (
    <div>
      from Login
      <input
        value={cred.email}
        placeholder="email"
        onChange={(e) => setCred({ ...cred, email: e.target.value })}
      />
      <input
        value={cred.password}
        placeholder="password"
        onChange={(e) => setCred({ ...cred, password: e.target.value })}
      />
      <button onClick={login}>login </button>
    </div>
  );
};
