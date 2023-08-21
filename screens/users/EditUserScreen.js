// EditUserScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useUserContext } from './UserContext';
import { useNavigation } from '@react-navigation/native';

export default function EditUserScreen({ route }) {
  const { userId } = route.params;
  const navigation = useNavigation();
  const { users, updateUser } = useUserContext();
  const user = users.find((user) => user.id === userId);

  const [name, setName] = useState(user.name);

  const handleUpdateUser = () => {
    if (name.trim() === '') {
      return; // Não atualizar se o nome estiver vazio
    }

    const updatedUser = { ...user, name: name };
    updateUser(updatedUser);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Editar Usuário</Text>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={name}
          onChangeText={setName}
        />
        {/* Adicione mais campos de edição aqui, se necessário */}
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Cancelar" onPress={() => navigation.goBack()} color="#888" />
        <Button title="Salvar" onPress={handleUpdateUser} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 20,
    borderRadius: 8,
  },
  input: {
    fontSize: 16,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
