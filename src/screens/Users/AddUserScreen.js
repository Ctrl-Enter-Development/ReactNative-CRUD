import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useUserContext } from '../../contexts/UserContext';
import { CustomHeader } from '../../components/CustomHeader'; 

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
      <CustomHeader title="Cadastrar Usuário" showBackButton={true} showMenuButton={true} />
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
