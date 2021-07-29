import React, { useEffect, useState } from "react";
import _ from "lodash";
import { useCollection } from "../hooks/useCollection";
import { useHistory } from "react-router-dom";
export const ApproveList = () => {
  const history = useHistory();
  const { data: Posts } = useCollection("posts");
  const [list, setList] = useState([]);
  useEffect(() => {
    setList(_.filter(Posts, { verify: false }));
  }, [Posts]);
  console.log(list);

  return (
    <div>
      <div>
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
