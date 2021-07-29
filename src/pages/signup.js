import React, { useState } from "react";
import { useHistory } from "react-router";
import { useFirebase } from "../firebase";
import { useCollection } from "../hooks/useCollection";

export const SignUp = () => {
  const { auth } = useFirebase();
  const { updateDoc } = useCollection("users");
  const { firestore } = useFirebase();
  const history = useHistory();
  const [cred, setCred] = useState({
    email: "",
    password: "",
    password2: "",
    admin: false,
  });

  const SignUp = async () => {
    if (cred.email && cred.password && cred.password2) {
      if (cred.password2 == cred.password) {
        auth
          .createUserWithEmailAndPassword(cred.email, cred.password)
          .then(async (user) => {
            console.log(user.email, "signup success");
            await firestore.collection("user").doc(cred.email).set(cred);
            await history.push("/");
          })
          .catch((err) => {
            alert(err.message);
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
      from SignUp
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
      <input
        value={cred.password2}
        placeholder="password2"
        onChange={(e) => setCred({ ...cred, password2: e.target.value })}
      />
      <button onClick={SignUp}>signup</button>
    </div>
  );
};
