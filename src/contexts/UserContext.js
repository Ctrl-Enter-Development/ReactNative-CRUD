// UserContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext();

export function useUserContext() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [users, setUsers] = useState([]);

  const addUserProduct = async (userId, productId) => {
    const updatedUsers = users.map((user) =>
      user.id === userId ? { ...user, produtos: [...user.produtos, productId] } : user
    );
    setUsers(updatedUsers);
    saveUsersToStorage(updatedUsers);
  };
  
  useEffect(() => {
    async function loadUsersFromStorage() {
      try {
        const existingUsers = await AsyncStorage.getItem('usuarios');
        const usersData = existingUsers ? JSON.parse(existingUsers) : [];
        setUsers(usersData);
      } catch (error) {
        console.error('Error loading users:', error);
      }
    }
  
    loadUsersFromStorage();
  }, []);

  const saveUsersToStorage = async (updatedUsers) => {
    try {
      await AsyncStorage.setItem('usuarios', JSON.stringify(updatedUsers));
    } catch (error) {
      console.error('Error saving users:', error);
    }
  };

  const addUser = async (user) => {
    const updatedUsers = [...users, user];
    setUsers(updatedUsers);
    saveUsersToStorage(updatedUsers);
  };

  const updateUser = (updatedUser) => {
    const updatedUsers = users.map((user) =>
      user.id === updatedUser.id ? updatedUser : user
    );
    setUsers(updatedUsers);
    saveUsersToStorage(updatedUsers);
  };

  const removeUser = async (userId) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
    saveUsersToStorage(updatedUsers);
  };

  return (
    <UserContext.Provider value={{ users, addUser, updateUser, removeUser, addUserProduct }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;