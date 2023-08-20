import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import UserListScreen from './screens/UserListScreen';
import AddUserScreen from './screens/AddUserScreen';
import UserDetailScreen from './screens/UserDetailScreen';
import ProductListScreen from './screens/ProductListScreen';
import AddProductScreen from './screens/AddProductScreen';
import EditProductScreen from './navigation/EditProductScreen';
import ProductDetailScreen from './screens/ProductDetailScreen'; // Adicione esta linha

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function UserStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Lista de Usuários" component={UserListScreen} />
      <Stack.Screen name="Adicionar Usuário" component={AddUserScreen} />
      <Stack.Screen name="Detalhes do Usuário" component={UserDetailScreen} />
    </Stack.Navigator>
  );
}

function ProductStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Lista de Produtos" component={ProductListScreen} />
      <Stack.Screen name="Adicionar Produto" component={AddProductScreen} />
      <Stack.Screen name="Detalhes do Produto" component={ProductDetailScreen} />
      <Stack.Screen name="Editar Produto" component={EditProductScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Usuários">
        <Drawer.Screen name="Usuários" component={UserStack} />
        <Drawer.Screen name="Produtos" component={ProductStack} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
