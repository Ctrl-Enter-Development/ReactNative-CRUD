// AddSaleScreen.js
import React, { useContext, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useUserContext } from '../../contexts/UserContext';
import { useProductContext } from '../../contexts/ProductContext';
import { useSaleContext } from '../../contexts/SaleContext';
import { Alert } from 'react-native';
import { CustomHeader } from '../../components/CustomHeader'; 



export default function AddSaleScreen({ navigation }) {
  const { users, updateUser } = useUserContext();
  const { productList } = useProductContext();
  const { addSale } = useSaleContext(); 

  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleAssignProduct = () => {
    if (selectedUser && selectedProduct) {
      const updatedUser = {
        ...selectedUser,
        produtos: [...(selectedUser.produtos || []), selectedProduct.id],
      };

      updateUser(updatedUser);
      addSale({ userId: selectedUser.id, productId: selectedProduct.id });
  
      // Exibir alerta de sucesso
      Alert.alert('Sucesso', 'Produto atribuído com sucesso ao usuário.');
  
      setSelectedUser(null);
      setSelectedProduct(null);
    } else {
      // Exibir alerta de erro
      Alert.alert('Erro', 'Selecione um usuário e um produto para atribuir.');
    }
  };  

  return (
    <View style={styles.container}>
    <CustomHeader title="Adicionar Venda" showBackButton={true} showMenuButton={true} />

      <Text style={styles.userListHeading}>Lista de Usuários</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setSelectedUser(item)}
            style={[
              styles.userItem,
              selectedUser && selectedUser.id === item.id && styles.selectedUserItem,
            ]}
          >
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      <Text style={styles.productListHeading}>Lista de Produtos Disponíveis</Text>
      <FlatList
        data={productList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setSelectedProduct(item)}
            style={[
              styles.productItem,
              selectedProduct && selectedProduct.id === item.id && styles.selectedProductItem,
            ]}
          >
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.assignButton} onPress={handleAssignProduct}>
        <Text style={styles.assignButtonText}>Atribuir Produto</Text>
      </TouchableOpacity>
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
  userListHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  userItem: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 10,
    borderRadius: 8,
  },
  selectedUserItem: {
    backgroundColor: '#007bff',
  },
  productListHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  productItem: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 10,
    borderRadius: 8,
  },
  selectedProductItem: {
    backgroundColor: '#007bff',
  },
  assignButton: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  assignButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});
