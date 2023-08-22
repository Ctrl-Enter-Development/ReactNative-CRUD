import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Bem-vindo à Aplicação</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Usuários')}
      >
        <MaterialIcons name="people" size={30} color="#007bff" />
        <Text style={styles.buttonText}>Lista de Usuários</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Produtos')}
      >
        <MaterialIcons name="shopping-cart" size={30} color="#007bff" />
        <Text style={styles.buttonText}>Lista de Produtos</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Adicionar Venda')}
      >
        <MaterialIcons name="add-shopping-cart" size={30} color="#007bff" />
        <Text style={styles.buttonText}>Adicionar Venda</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 18,
    marginLeft: 10,
    color: '#007bff',
  },
});
