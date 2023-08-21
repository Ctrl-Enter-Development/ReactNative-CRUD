import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useUserContext } from './UserContext';

export default function AddUserScreen({ navigation }) {
  const { addUser } = useUserContext();
  const [name, setName] = useState('');

  const handleAddUser = () => {
    if (name.trim() === '') {
      Alert.alert('Erro', 'Por favor, insira o nome do usuário.');
      return;
    }

    const newUser = {
      id: Date.now().toString(),
      name: name,
    };

    addUser(newUser);
    Alert.alert('Sucesso', 'Usuário cadastrado com sucesso.');
    setName('');
    navigation.goBack();
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
