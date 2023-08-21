import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { useUserContext } from './UserContext';

export default function DeleteUserScreen({ route, navigation }) {
  const { userId } = route.params;

  if (!userId) {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Usuário não encontrado</Text>
      </View>
    );
  }

  const { users, removeUser } = useUserContext(); // Aqui obtenha a lista de usuários do contexto
  const user = users.find((user) => user.id === userId);

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Usuário não encontrado</Text>
      </View>
    );
  }

  const handleDeleteUser = () => {
    Alert.alert(
      'Confirmar Exclusão',
      'Tem certeza de que deseja excluir este usuário?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          onPress: () => {
            removeUser(userId);
            navigation.navigate('UserList');
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Excluir Usuário</Text>
      <Text style={styles.confirmText}>
        Tem certeza de que deseja excluir este usuário?
      </Text>
      <Button title="Excluir" onPress={handleDeleteUser} />
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
  confirmText: {
    fontSize: 16,
    marginBottom: 20,
  },
});
