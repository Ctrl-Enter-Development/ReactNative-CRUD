import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { useProductContext } from './ProductContext';

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
    <KeyboardAvoidingView style={styles.container} behavior="padding">
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
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Valor Unitário"
        keyboardType="decimal-pad"
        value={productValue}
        onChangeText={setProductValue}
      />
      <Button title="Adicionar Produto" onPress={handleAddProduct} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});
