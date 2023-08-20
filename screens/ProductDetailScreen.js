import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProductDetailScreen({ route }) {
  const { product } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Detalhes do Produto</Text>
      <Text>Nome: {product.name}</Text>
      <Text>Descrição: {product.description}</Text>
      <Text>Valor Unitário: {product.value}</Text>
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
});
