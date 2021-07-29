import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useFirebase } from "../firebase";
import { useCollection, useDoc } from "../hooks/useCollection";

export const Review = () => {
  const location = useLocation();
  const history = useHistory();
  const { data, loading } = useDoc(`/posts/${location.pathname.slice(8)}`);
  const { updateDoc } = useCollection("/posts/");

  const VerifyPost = async () => {
    await updateDoc(location.pathname.slice(8), {
      id: location.pathname.slice(8),
      name: data.name,
      description: data.description,
      verify: true,
    });
    await alert("post updated");
    await history.push("/");
  };
  console.log(location.pathname.slice(8));
  return (
    <>
      <div>
        {loading ? (
          "...loading"
        ) : (
          <div>
            <div>{data.name}</div>
            <div>{data.description}</div>
            <div>{data.verify}</div>
            {data.verify == false && (
              <button onClick={VerifyPost}>verify Blog</button>
            )}
          </div>
        )}
      </div>
    </>
  );
};
