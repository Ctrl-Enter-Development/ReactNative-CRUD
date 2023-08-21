import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useProductContext } from './ProductContext'; // Certifique-se de que o caminho para o arquivo está correto

export default function AddProductScreen({ navigation }) {
  const { addProductToList } = useProductContext();
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productValue, setProductValue] = useState('');

  const handleAddProduct = () => {
    if (!productName || !productDescription || !productValue) {
      return;
    }

    const newProduct = {
      id: Date.now().toString(),
      name: productName,
      description: productDescription,
      value: parseFloat(productValue),
    };

    addProductToList(newProduct);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Adicionar Produto</Text>
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
      <Button title="Adicionar" onPress={handleAddProduct} />
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
