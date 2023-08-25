import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Button from '../../components/Button'; // Importando o componente Button
import { useNavigation } from '@react-navigation/native';
import { CustomHeader } from '../../components/CustomHeader'; 

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
    <CustomHeader title="App Expo GO" showBackButton={false} showMenuButton={false} />

      <View style={styles.content}>
      <Button
        onPress={() => navigation.navigate('Usuários')}
        title="Lista de Usuários"
        iconName="people" 
      />

      <Button
        onPress={() => navigation.navigate('Produtos')}
        title="Lista de Produtos"
        iconName="shopping-cart" 
      />


      <Button
        onPress={() => navigation.navigate('Adicionar Venda')}
        title="Adicionar Venda"
        iconName="add-shopping-cart" 
      />
      <Button
       onPress={() => navigation.navigate('Configurações')} // Use o nome correto da tela
       title="Configurações"
       iconName="settings" // Nome do ícone
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  CustomHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  }
});
