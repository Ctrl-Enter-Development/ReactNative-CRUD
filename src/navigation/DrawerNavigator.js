import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';

import HomeScreen from '../screens/Home/HomeScreen';
import UserStack from './UserStack';
import ProductStack from './ProductStack';
import AddSaleScreen from '../screens/Sales/AddSaleScreen';

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerPosition="right"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Usuários" component={UserStack} />
      <Drawer.Screen name="Produtos" component={ProductStack} />
      <Drawer.Screen name="Adicionar Venda" component={AddSaleScreen} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
