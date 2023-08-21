import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useProductContext } from './ProductContext';

export default function EditProductScreen({ route, navigation }) {
  const { product } = route.params;
  const { updateProduct } = useProductContext();
  const [productName, setProductName] = useState(product.name);
  const [productDescription, setProductDescription] = useState(product.description);
  const [productValue, setProductValue] = useState(product.value ? product.value.toString() : '');

  const handleEditProduct = () => {
    if (!productName || !productDescription || !productValue) {
      return;
    }

    const editedProduct = {
      id: product.id,
      name: productName,
      description: productDescription,
      value: parseFloat(productValue),
    };

    updateProduct(editedProduct);
    navigation.navigate('ProductDetail', { product: editedProduct });
  };

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
      <Button title="Salvar Alterações" onPress={handleEditProduct} />
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
  input: {
    width: '100%',
    padding: 12,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
  },
});
