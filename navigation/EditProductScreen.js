import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function EditProductScreen({ route }) {
  const { product } = route.params;
  const [productName, setProductName] = useState(product.name);
  const [productDescription, setProductDescription] = useState(product.description);
  const [productValue, setProductValue] = useState(product.value ? product.value.toString() : '');

  // Restante do código para a edição do produto

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Editar Produto</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome do Produto"
        value={productName}
        onChangeText={setProductName}
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={productDescription}
        onChangeText={setProductDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Valor Unitário"
        keyboardType="decimal-pad"
        value={productValue}
        onChangeText={setProductValue}
      />
      <Button title="Salvar" onPress={() => handleEditProduct()} />
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
  input: {
    width: '100%',
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
  },
});
