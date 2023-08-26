
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { useProductContext } from '../../contexts/ProductContext';
import { CustomHeader } from '../../components/CustomHeader'; 

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
    <KeyboardAvoidingView style={styles.container} behavior="padding">
     <CustomHeader title="Adicionar Produto" showBackButton={true} showMenuButton={true}></CustomHeader>
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
       </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    margin:0,
    backgroundColor: '#f0f0f0',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    margin:10,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});
