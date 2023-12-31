import React, { useEffect } from 'react';
import { View, Text, FlatList, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { CustomHeader } from '../../components/CustomHeader';
import { useUserContext } from '../../contexts/UserContext'; 

export default function UserListScreen({ navigation }) {
  const { users, loading } = useUserContext();

 
    if (loading) {
      return (
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      );
    }

  const renderUserItem = ({ item }) => (
    <View style={styles.userItem}>
      <Text style={styles.userName}>{item.name}</Text>
      <Button
        title="Ver Detalhes"
        onPress={() => navigation.navigate('UserDetail', { userId: item.id })}
      />
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        {/* Mostrar um indicador de carregamento, como um spinner */}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CustomHeader title="Lista de Usuários Cadastrados" showBackButton={true} showMenuButton={true} />
      <FlatList
        data={users} // Use a variável "users" diretamente aqui
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderUserItem}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddUser')}
      >
        <Text style={styles.addButtonText}>Adicionar Usuário</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
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
  addButton: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});