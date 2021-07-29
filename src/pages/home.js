import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useCollection } from "../hooks/useCollection";
import _ from "lodash";
import { useFirebase } from "../firebase";
import { AuthContext } from "../provider/authContext";
export const Home = () => {
  const history = useHistory();
  const { data: Posts } = useCollection("posts");
  const [list, setList] = useState([]);
  useEffect(() => {
    setList(_.filter(Posts, { verify: true }));
  }, [Posts]);
  const { auth } = useFirebase();
  const { user, ready } = useContext(AuthContext);
  
  console.log(user);
  return (
    <div>
      <div>
        home approved blogs
        {ready ? (
          <button onClick={() => auth.signOut()}>logout</button>
        ) : ( 
          <div>
            <button onClick={() => history.push("/login")}>login</button>
            <button onClick={() => history.push("/signup")}>Signup</button>
          </div>
        )}
        { user?.admin == true && (
          <button onClick={() => history.push("/approve")}>approve</button>
        )}
        <button onClick={() => history.push("/upload")}>uploadBlog</button>
        {list.map((x) => (
          <div
            onClick={() => history.push(`/review/${x.id}`)}
            style={{
              borderColor: "black",
              borderRadius: "4px",
              borderWidth: "2px",
              borderStyle: "solid",
              margin: "15px",
            }}
          >
            <div>{x.name}</div>
            <div>{x.description}</div>
            <div>{x.id}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
