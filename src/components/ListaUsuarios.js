import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import * as FileSystem from 'expo-file-system';

const ListaUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      const path = FileSystem.documentDirectory + 'database.json';
      try {
        const data = await FileSystem.readAsStringAsync(path);
        const jsonData = JSON.parse(data);
        setUsuarios(jsonData.usuarios);
      } catch (error) {
        console.log('Erro ao ler o arquivo de usuários:', error);
      }
    };

    fetchUsuarios();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.userContainer}>
      <Text style={styles.userName}>{item.nome}</Text>
      <Text style={styles.userEmail}>{item.email}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Usuários:</Text>
      <FlatList
        data={usuarios}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  userContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 14,
    color: '#888',
  },
});

export default ListaUsuarios;
