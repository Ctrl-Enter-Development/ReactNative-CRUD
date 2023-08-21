import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useUserContext } from './UserContext';

export default function UserDetailScreen({ route, navigation }) { // Certifique-se de receber navigation como prop
  const { userId } = route.params;
  const { users } = useUserContext();
  const user = users.find((user) => user.id === userId);

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Usuário não encontrado</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Detalhes do Usuário</Text>
      <Text style={styles.userInfo}>Nome: {user.name}</Text>
      {/* Adicione mais informações do usuário aqui, se necessário */}
      <Button
        title="Editar Usuário"
        onPress={() => navigation.navigate('Editar Usuário', { userId: userId })}
      />
      <Button
        title="Excluir Usuário"
        onPress={() => navigation.navigate('Excluir Usuário', { userId: userId })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 20,
    marginBottom: 10,
  },
  userInfo: {
    fontSize: 16,
    marginBottom: 5,
  },
});
