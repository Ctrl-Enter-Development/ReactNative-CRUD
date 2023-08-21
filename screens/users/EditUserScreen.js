import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useUserContext } from './UserContext';
import { useNavigation } from '@react-navigation/native';

export default function EditUserScreen({ route }) {
  const { userId } = route.params;
  const navigation = useNavigation();
  const { users, updateUser } = useUserContext();
  const user = users.find((user) => user.id === userId);

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Usuário não encontrado</Text>
      </View>
    );
  }

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
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />
      <Button title="Salvar" onPress={handleUpdateUser} />
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
