import React from 'react';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { SafeAreaView, StatusBar, Platform } from 'react-native';
import { UserProvider } from './src/contexts/UserContext';
import { ProductProvider } from './src/contexts/ProductContext';
import { SaleProvider  } from './src/contexts/SaleContext';
import DrawerNavigator from './src/navigation/DrawerNavigator'; 
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}>
      <StatusBar barStyle="dark-content" backgroundColor="#f0f0f0" />
      <NavigationContainer>
        <UserProvider>
          <ProductProvider>
            <SaleProvider>
             <DrawerNavigator />
            </SaleProvider>
          </ProductProvider>
        </UserProvider>
      </NavigationContainer>
    </SafeAreaView>
  );
}
