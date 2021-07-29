import React, { useState } from "react";
import { useCollection } from "../hooks/useCollection";
import { useHistory } from "react-router-dom";
export const UploadPost = () => {
  const { createDoc } = useCollection("posts");
  const history = useHistory();
  const [post, setpost] = useState({
    verify: false,
    name: "",
    description: "",
  });
  const uploadBlog = async () => {
    if (post.name && post.description) await createDoc(post);
    alert("post uploaded");
    history.push("/");
  };

  return (
    <div>
      from post
      <input
        value={post.name}
        placeholder="name"
        onChange={(e) => setpost({ ...post, name: e.target.value })}
      />
      <input
        value={post.description}
        placeholder="description"
        onChange={(e) => setpost({ ...post, description: e.target.value })}
      />
      <button onClick={uploadBlog}>upload Post </button>
    </div>
  );
};
