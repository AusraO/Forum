import React, { createContext } from 'react';
import { useState } from 'react';

const EditPostContext = createContext();

export const EditPostProvider = ({ children }) => {
  const [editPost, setEditPost] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <EditPostContext.Provider
     value={{ editPost, setEditPost, isEditModalOpen, setIsEditModalOpen }}>
      {children}
    </EditPostContext.Provider>
  );
};

export default EditPostContext;