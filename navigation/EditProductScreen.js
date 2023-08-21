import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function EditProductScreen({ route, navigation }) {
  const { product } = route.params;
  const [productName, setProductName] = useState(product.name);
  const [productDescription, setProductDescription] = useState(product.description);
  const [productValue, setProductValue] = useState(product.value ? product.value.toString() : '');

  const handleEditProduct = () => {
    // Aqui você pode definir o código para atualizar o produto com os novos valores
    // Por exemplo, uma chamada para uma API de edição de produto
    updateProductOnServer(product.id, productName, productDescription, parseFloat(productValue));

    // Após a edição, você pode navegar de volta para a tela de detalhes do produto com as informações atualizadas
    const updatedProduct = {
      ...product,
      name: productName,
      description: productDescription,
      value: parseFloat(productValue),
    };

    navigation.navigate('Detalhes do Produto', { product: updatedProduct });
  };

  // Função fictícia para atualizar o produto na API ou no estado global
  const updateProductOnServer = (productId, name, description, value) => {
    // Aqui você implementa a lógica para atualizar o produto
    // Pode ser uma chamada para uma API, uma atualização no estado global, etc.
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
      <Button title="Salvar" onPress={handleEditProduct} />
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
