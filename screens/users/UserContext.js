import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importe o AsyncStorage

export const UserContext = createContext();

export function useUserContext() {
  return useContext(UserContext);
}

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

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

  const addUser = async (user) => {
    const updatedUsers = [...users, user];
    setUsers(updatedUsers);
    await AsyncStorage.setItem('usuarios', JSON.stringify(updatedUsers)); // Salvar no AsyncStorage
  };

  const updateUser = (updatedUser) => {
    const updatedUsers = users.map((user) =>
      user.id === updatedUser.id ? updatedUser : user
    );
    setUsers(updatedUsers);
  };

  const removeUser = (userId) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
  };

  return (
    <UserContext.Provider value={{ users, addUser, updateUser, removeUser }}>
      {children}
    </UserContext.Provider>
  );
};




