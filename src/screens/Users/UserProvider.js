import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';

export const UserContext = createContext();

export function useUserContext() {
  return useContext(UserContext);
}

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUsersFromDatabase() {
      try {
        const content = await FileSystem.readAsStringAsync(
          FileSystem.documentDirectory + 'database.json'
        );
        const data = JSON.parse(content);
        const usersData = data.users || [];
        setUsers(usersData);
        setLoading(false);
      } catch (error) {
        console.error('Error loading users from database:', error);
        setLoading(false);
      }
    }

    loadUsersFromDatabase();
  }, []);

  useEffect(() => {
    async function saveUsersToDatabase() {
      try {
        const data = { users };
        await FileSystem.writeAsStringAsync(
          FileSystem.documentDirectory + 'database.json',
          JSON.stringify(data)
        );
      } catch (error) {
        console.error('Error saving users to database:', error);
      }
    }

    if (!loading) {
      saveUsersToDatabase();
    }
  }, [users, loading]);

  const addUser = async (user) => {
    const updatedUsers = [...users, user];
    setUsers(updatedUsers);
  };

  const updateUser = async (updatedUser) => {
    const updatedUsers = users.map((user) =>
      user.id === updatedUser.id ? updatedUser : user
    );
    setUsers(updatedUsers);
  };

  const removeUser = async (userId) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
  };

  return (
    <UserContext.Provider value={{ users, loading, addUser, updateUser, removeUser }}>
      {children}
    </UserContext.Provider>
  );
};