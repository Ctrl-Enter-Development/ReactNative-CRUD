import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { ProductContext } from './ProductContext';

export default function ProductListScreen({ navigation }) {
  const { productList } = useContext(ProductContext);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Lista de Produtos</Text>
      <FlatList
        data={productList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Detalhes do Produto', { product: item })}
            style={styles.productItem}
          >
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('Adicionar Produto')}
      >
        <Text style={styles.addButtonText}>Adicionar Produto</Text>
      </TouchableOpacity>
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
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  addButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
  },
});
