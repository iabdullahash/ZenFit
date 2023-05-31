import React, { createContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loggedIn,setLoggedIn] = useState(false);

  const updateUser = (data) => {
    setUserData(data);
  };

  const clearUserContext = async () => {
    setLoggedIn(false);
    await AsyncStorage.removeItem('userData');
  };

  return (
    <UserContext.Provider value={{ userData, updateUser, clearUserContext ,loggedIn,setLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};