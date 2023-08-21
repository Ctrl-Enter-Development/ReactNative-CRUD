import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { ProductProvider } from './screens/products/ProductContext';
import { UserProvider } from './screens/users/UserContext'; // Importar o UserProvider
import UserListScreen from './screens/users/UserListScreen';
import AddUserScreen from './screens/users/AddUserScreen';
import UserDetailScreen from './screens/users/UserDetailScreen';
import ProductListScreen from './screens/products/ProductListScreen';
import AddProductScreen from './screens/products/AddProductScreen';
import EditProductScreen from './screens/products/EditProductScreen';
import ProductDetailScreen from './screens/products/ProductDetailScreen';

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
      <Stack.Screen name="Editar Produto" component={EditProductScreen} />
      <Stack.Screen name="Detalhes do Produto" component={ProductDetailScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <UserProvider>
        <ProductProvider>
          <Drawer.Navigator initialRouteName="Usuários">
            <Drawer.Screen name="Usuários" component={UserStack} />
            <Drawer.Screen name="Produtos" component={ProductStack} />
          </Drawer.Navigator>
        </ProductProvider>
      </UserProvider>
    </NavigationContainer>
  );
}
