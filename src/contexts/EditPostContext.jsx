import React, { createContext, useState } from 'react';

const EditPostContext = createContext();

export const EditPostProvider = ({ children }) => {
  const [editPost, setEditPost] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const patchPostContent = (postId, content) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: content,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the updated post data
        console.log('Updated post:', data);
      })
      .catch((error) => {
        console.error('Error updating post:', error);
      });
  };

  return (
    <EditPostContext.Provider
      value={{
        editPost,
        setEditPost,
        isEditModalOpen,
        setIsEditModalOpen,
        patchPostContent,
      }}
    >
      {children}
    </EditPostContext.Provider>
  );
};

export default EditPostContext;