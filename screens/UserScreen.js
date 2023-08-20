import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function UserScreen() {
  const [name, setName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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

      const existingUsers = await AsyncStorage.getItem('usuarios');
      const users = existingUsers ? JSON.parse(existingUsers) : [];
      users.push(newUser);

      await AsyncStorage.setItem('usuarios', JSON.stringify(users));

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
      <Text style={styles.heading}>Cadastrar Usuário</Text>
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
