import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useProductContext } from './ProductContext';

export default function ProductDetailScreen({ route, navigation }) {
  const { product } = route.params;
  const { removeProduct } = useProductContext();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Detalhes do Produto</Text>
      <Text>Nome: {product.name}</Text>
      <Text>Descrição: {product.description}</Text>
      <Text>Valor Unitário: {product.value}</Text>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate('Editar Produto', { product })}
      >
        <Text style={styles.editButtonText}>Editar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => {
          removeProduct(product.id);
          navigation.goBack();
        }}
      >
        <Text style={styles.deleteButtonText}>Excluir</Text>
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
  editButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#fff',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
  },
});
