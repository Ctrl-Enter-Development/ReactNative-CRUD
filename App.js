import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { ProductProvider } from './screens/products/ProductContext';
import { UserProvider } from './screens/users/UserContext';
import UserListScreen from './screens/users/UserListScreen';
import AddUserScreen from './screens/users/AddUserScreen';
import UserDetailScreen from './screens/users/UserDetailScreen';
import ProductListScreen from './screens/products/ProductListScreen';
import AddProductScreen from './screens/products/AddProductScreen';
import EditProductScreen from './screens/products/EditProductScreen';
import ProductDetailScreen from './screens/products/ProductDetailScreen';
import EditUserScreen from './screens/users/EditUserScreen';
import DeleteUserScreen from './screens/users/DeleteUserScreen';
import AddSaleScreen from './screens/sales/AddSaleScreen'; // Importe a nova tela
import HomeScreen from './screens/HomeScreen'; 
import { Ionicons } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function UserStack() {
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

function ProductStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="ProductList" component={ProductListScreen} />
      <Stack.Screen name="AddProduct" component={AddProductScreen} />
      <Stack.Screen name="EditProduct" component={EditProductScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
    </Stack.Navigator>
  );
}


function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Usuários" component={UserStack} />
      <Drawer.Screen name="Produtos" component={ProductStack} />
      <Drawer.Screen name="Adicionar Venda" component={AddSaleScreen} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <UserProvider>
      <ProductProvider>
        <NavigationContainer>
          <DrawerNavigator />
        </NavigationContainer>
      </ProductProvider>
    </UserProvider>
  );
}
