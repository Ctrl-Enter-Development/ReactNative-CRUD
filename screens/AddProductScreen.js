import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddProductScreen({ navigation, route }) {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productValue, setProductValue] = useState('');

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title="Cadastrar"
          onPress={() => {
            handleAddProduct();
          }}
        />
      ),
    });
  }, [productName, productDescription, productValue]);

  const handleAddProduct = async () => {
    if (productName.trim() === '' || productValue.trim() === '') {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios.');
      return;
    }

    try {
      const newProduct = {
        id: Date.now().toString(),
        name: productName,
        description: productDescription,
        value: parseFloat(productValue),
      };

      const existingProducts = await AsyncStorage.getItem('produtos');
      const products = existingProducts ? JSON.parse(existingProducts) : [];
      products.push(newProduct);

      await AsyncStorage.setItem('produtos', JSON.stringify(products));

      Alert.alert('Sucesso', 'Produto cadastrado com sucesso.');
      setProductName('');
      setProductDescription('');
      setProductValue('');
      if (route.params && route.params.onAddProduct) {
        route.params.onAddProduct();
      }
      navigation.goBack();
    } catch (error) {
      console.error('Error adding product:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao cadastrar o produto.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Cadastrar Produto</Text>
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
