// Código do UserDetailScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function UserDetailScreen({ route, navigation }) {
  const { userId } = route.params;
  const [userProducts, setUserProducts] = useState([]);

  useEffect(() => {
    async function fetchUserProducts() {
      try {
        const existingProducts = await AsyncStorage.getItem('produtos');
        const productsData = existingProducts ? JSON.parse(existingProducts) : [];
        const userProductsData = productsData.filter(product => product.userId === userId);
        setUserProducts(userProductsData);
      } catch (error) {
        console.error('Error fetching user products:', error);
      }
    }

    fetchUserProducts();
  }, []);

  const handleRemoveProduct = async (productId) => {
    try {
      const updatedProducts = userProducts.filter(product => product.id !== productId);
      await AsyncStorage.setItem('produtos', JSON.stringify(updatedProducts));
      setUserProducts(updatedProducts);
    } catch (error) {
      console.error('Error removing product:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Produtos do Usuário</Text>
      <FlatList
        data={userProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            <Text style={styles.productName}>{item.name}</Text>
            <Button title="Remover" onPress={() => handleRemoveProduct(item.id)} />
          </View>
        )}
      />
      <Button
        title="Adicionar Produto"
        onPress={() => navigation.navigate('Adicionar Produto')}
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
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  productName: {
    fontSize: 16,
  },
});
