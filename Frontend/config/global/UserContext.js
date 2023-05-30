import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  const updateUser = (data) => {
    setUserData(data);
  };

  const clearUserContext = () => {
    setUserData(null);
  };

  return (
    <UserContext.Provider value={{ userData, updateUser, clearUserContext  }}>
      {children}
    </UserContext.Provider>
  );
};