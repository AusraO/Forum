import React, { createContext, useState } from "react";

export const RepliesContext = createContext();

const RepliesContextProvider = (props) => {
  const [replies, setReplies] = useState([]);

  const addReply = (newReply) => {
    setReplies([...replies, newReply]);
  };

  return (
    <RepliesContext.Provider value={{ replies, addReply }}>
      {props.children}
    </RepliesContext.Provider>
  );
};

export default RepliesContextProvider;