import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import UserListScreen from '../screens/Users/UserListScreen';
import AddUserScreen from '../screens/Users/AddUserScreen';
import UserDetailScreen from '../screens/Users/UserDetailScreen';
import EditUserScreen from '../screens/Users/EditUserScreen';
import DeleteUserScreen from '../screens/Users/DeleteUserScreen';

const Stack = createStackNavigator();

export default function UserStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="UserList" component={UserListScreen} />
      <Stack.Screen name="AddUser" component={AddUserScreen} />
      <Stack.Screen name="UserDetail" component={UserDetailScreen} />
      <Stack.Screen name="EditUser" component={EditUserScreen} />
      <Stack.Screen name="DeleteUser" component={DeleteUserScreen} />
    </Stack.Navigator>
  );
}
