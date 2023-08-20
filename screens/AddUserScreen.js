import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddUserScreen({ navigation }) {
  const [name, setName] = useState('');

  const handleAddUser = async () => {
    if (name.trim() === '') {
      Alert.alert('Erro', 'Por favor, insira o nome do usuário.');
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

      Alert.alert('Sucesso', 'Usuário cadastrado com sucesso.');
      setName('');
      navigation.goBack();
    } catch (error) {
      console.error('Error adding user:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao cadastrar o usuário.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Cadastrar Usuário</Text>
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
    backgroundColor: '#fff',
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
});
