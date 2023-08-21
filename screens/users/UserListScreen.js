// UserListScreen.js
import React from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { useUserContext } from './UserContext';

export default function UserListScreen({ navigation }) {
  const { users } = useUserContext();

  const renderUserItem = ({ item }) => (
    <View style={styles.userItem}>
      <Text style={styles.userName}>{item.name}</Text>
      <Button
        title="Ver Detalhes"
        onPress={() => navigation.navigate('Detalhes do Usuário', { userId: item.id })}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Lista de Usuários Cadastrados</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderUserItem}
      />
      <Button
        title="Cadastrar Usuário"
        onPress={() => navigation.navigate('Adicionar Usuário')}
      />
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
  userItem: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 10,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userName: {
    fontSize: 18,
  },
});
