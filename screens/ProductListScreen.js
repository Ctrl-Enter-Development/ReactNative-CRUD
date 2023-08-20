import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons'; // Importar o ícone Feather
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProductListScreen({ navigation }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const existingProducts = await AsyncStorage.getItem('produtos');
        const productsData = existingProducts ? JSON.parse(existingProducts) : [];
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    fetchProducts();
  }, []);

  const handleRefreshProducts = useCallback(async () => {
    try {
      const existingProducts = await AsyncStorage.getItem('produtos');
      const productsData = existingProducts ? JSON.parse(existingProducts) : [];
      setProducts(productsData);
    } catch (error) {
      console.error('Error refreshing products:', error);
    }
  }, []);

  const navigateToProductDetail = (product) => {
    navigation.navigate('Detalhes do Produto', { product });
  };

  const navigateToEditProduct = (product) => {
    navigation.navigate('Editar Produto', { product });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Lista de Produtos Cadastrados</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.productItem}
            onPress={() => navigateToProductDetail(item)}
          >
            <Text style={styles.productName}>{item.name}</Text>
            <TouchableOpacity
              onPress={() => navigateToEditProduct(item)}
              style={styles.editIconContainer}
            >
              <Feather name="edit" size={20} color="gray" />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
      <Button
        title="Adicionar Produto"
        onPress={() =>
          navigation.navigate('Adicionar Produto', {
            onAddProduct: handleRefreshProducts,
          })
        }
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
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  productName: {
    flex: 1,
    fontSize: 16,
  },
  editIconContainer: {
    padding: 5,
  },
});
