import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useProductContext } from '../../contexts/ProductContext'; // Certifique-se de que o contexto de produtos seja importado corretamente
import { CustomHeader } from '../../components/CustomHeader'; 

export default function ProductDetailScreen({ route, navigation }) {
  const { product } = route.params;
  const { removeProduct } = useProductContext(); // Certifique-se de que está usando o contexto de produtos

  const handleDeleteProduct = () => {
    Alert.alert(
      'Confirmar Exclusão',
      'Tem certeza de que deseja excluir este produto?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            removeProduct(product.id);
            navigation.goBack();
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <CustomHeader title="Detalhes do Produto" showBackButton={true} showMenuButton={true} />
      <Text>Nome: {product.name}</Text>
      <Text>Descrição: {product.description}</Text>
      <Text>Valor Unitário: R$ {product.value.toFixed(2)}</Text>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate('EditProduct', { product })}
      >
        <Text style={styles.editButtonText}>Editar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={handleDeleteProduct}
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