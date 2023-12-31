// Código do UserScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CustomHeader } from '../../components/CustomHeader'; 

export function UserScreen() {
  const [name, setName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { addUser } = useUserContext(); 
  
  const handleAddUser = async () => {
    if (name.trim() === '') {
      setErrorMessage('Por favor, insira um nome válido.');
      return;
    }
  
    try {
      const newUser = {
        id: Date.now().toString(),
        name: name,
      };
  
      addUser(newUser); // Assume que você importou e está usando useUserContext
      setName('');
      setSuccessMessage('Usuário cadastrado com sucesso.');
      setErrorMessage('');
    } catch (error) {
      console.error('Error adding user:', error);
      setSuccessMessage('');
      setErrorMessage('Ocorreu um erro ao cadastrar o usuário.');
    }
  };

  return (
    <View style={styles.container}>
    <CustomHeader title="Cadastrar Usuário" showBackButton={true} showMenuButton={true} />
      {successMessage ? <Text style={styles.successMessage}>{successMessage}</Text> : null}
      {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />
      <Button title="Cadastrar" onPress={handleAddUser} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 20,
    marginBottom: 10,
  },
  input: {
    width: '100%',
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
  },
  successMessage: {
    color: 'green',
    marginBottom: 10,
  },
  errorMessage: {
    color: 'red',
    marginBottom: 10,
  },
});
