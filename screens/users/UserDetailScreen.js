// UserDetailScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useUserContext } from './UserContext';

export default function UserDetailScreen({ route, navigation }) {
  const { userId } = route.params;
  const { users } = useUserContext();
  const user = users.find((user) => user.id === userId);

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Usuário não encontrado</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Detalhes do Usuário</Text>
      <View style={styles.userInfoContainer}>
        <Text style={styles.userInfoLabel}>Nome:</Text>
        <Text style={styles.userInfo}>{user.name}</Text>
        {/* Adicione mais informações do usuário aqui, se necessário */}
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Editar Usuário"
          onPress={() => navigation.navigate('EditUser', { userId: userId })}
        />
        <Button
          title="Excluir Usuário"
          onPress={() => navigation.navigate('DeleteUser', { userId: userId })}
        />
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
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
  userInfoContainer: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 20,
    borderRadius: 8,
  },
  userInfoLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  userInfo: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
