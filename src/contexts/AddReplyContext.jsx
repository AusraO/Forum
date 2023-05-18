import React, { createContext, useState } from 'react';

const AddRepliesContext = createContext({
  replies: [],
  addReply: () => {},
});

export const AddRepliesProvider = ({ children }) => {
  const [replies, setReplies] = useState([]);

  const addReply = async (newReply) => {
    try {
      // Make an API call to post the new reply to a JSON endpoint
      const response = await fetch('http://localhost:8080/replies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReply),
      });

      if (!response.ok) {
        throw new Error('Failed to add reply.');
      }

      const createdReply = await response.json();

      // Update the state with the new reply
      setReplies((prevReplies) => [...prevReplies, createdReply]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AddRepliesContext.Provider value={{ replies, addReply }}>
      {children}
    </AddRepliesContext.Provider>
  );
};

export default AddRepliesContext;