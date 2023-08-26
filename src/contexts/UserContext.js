import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { dataPath } from '../constants/constants';

export const UserContext = createContext();

export function useUserContext() {
  return useContext(UserContext);
}

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUsersFromStorage() {
      try {
        const existingUsers = await AsyncStorage.getItem(dataPath);
        const usersData = existingUsers ? JSON.parse(existingUsers) : [];
        setUsers(usersData);
        setLoading(false);
      } catch (error) {
        console.error('Error loading users:', error);
        setLoading(false);
      }
    }

    loadUsersFromStorage();
  }, []);

  const saveUsersToStorage = async (updatedUsers) => {
    try {
      await AsyncStorage.setItem(dataPath, JSON.stringify(updatedUsers));
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

  const removeUser = (userId) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
    saveUsersToStorage(updatedUsers);
  };


  const clearUsers = async () => {
    try {
      setUsers([]); // Limpa a lista de usuários
      await saveUsersToStorage([]); // Salva a lista vazia no AsyncStorage
    } catch (error) {
      console.error('Error clearing users:', error);
      throw error;
    }
  };

  const importUsers = (importedUsers) => {
    setUsers(importedUsers);
    saveUsersToStorage(importedUsers);
  };

  const assignProductToUser = (userId, productId) => {
    const updatedUsers = users.map((user) => {
      if (user.id === userId) {
        return {
          ...user,
          produtos: [...(user.produtos || []), productId],
        };
      }
      return user;
    });
  
    setUsers(updatedUsers);
    saveUsersToStorage(updatedUsers);
  };

  const updateUserSales = (userId, updater) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, produtos: updater(user.produtos || []) } : user
      )
    );
    saveUsersToStorage(updatedUsers);
  };

  return (
    <UserContext.Provider
      value={{
        users,
        loading,
        addUser,
        updateUser,
        removeUser,
        assignProductToUser,
        clearUsers,
        importUsers,
        updateUserSales,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
