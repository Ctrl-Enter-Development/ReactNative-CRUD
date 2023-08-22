// UserDetailScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useUserContext } from './UserContext';
import { useProductContext } from '../products/ProductContext';

export default function UserDetailScreen({ route, navigation }) {
  const { userId } = route.params;
  const { users } = useUserContext();
  const { productList } = useProductContext();
  const user = users.find((user) => user.id === userId);

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Usuário não encontrado</Text>
      </View>
    );
  }

  // Verifique se o array de produtos está definido no usuário
  const userProducts = user.produtos
    ? productList.filter((product) => user.produtos.includes(product.id))
    : [];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Detalhes do Usuário</Text>
      <View style={styles.userInfoContainer}>
        <Text style={styles.userInfoLabel}>Nome:</Text>
        <Text style={styles.userInfo}>{user.name}</Text>

        {/* Exiba a lista de produtos associados ao usuário */}
        <Text style={styles.userInfoLabel}>Produtos Adicionados:</Text>
        {userProducts.length > 0 ? (
          userProducts.map((product) => (
            <Text key={product.id} style={styles.userInfo}>
              - {product.name}
            </Text>
          ))
        ) : (
          <Text style={styles.userInfo}>Nenhum produto associado</Text>
        )}
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
