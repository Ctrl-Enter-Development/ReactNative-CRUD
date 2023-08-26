import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { useUserContext } from '../../contexts/UserContext';
import { useProductContext } from '../../contexts/ProductContext';
import { useSaleContext } from '../../contexts/SaleContext';
import { useNavigation } from '@react-navigation/native';
import { CustomHeader } from '../../components/CustomHeader';
import { v4 as uuidv4 } from 'uuid';


export default function EditUserScreen({ route }) {
  const { userId } = route.params;
  const navigation = useNavigation();
  const { users, updateUser } = useUserContext();
  const { productList } = useProductContext();
  const { removeSale } = useSaleContext();

  const user = users.find((user) => user.id === userId);
  const [name, setName] = useState(user ? user.name : '');
  const [selectedProductToRemove, setSelectedProductToRemove] = useState(null);
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] = useState(false);

  const handleUpdateUser = () => {
    if (name.trim() === '') {
      return;
    }

    const updatedUser = { ...user, name: name };
    updateUser(updatedUser);
    navigation.goBack();
  };

  const handleRemoveProduct = (productId) => {
    setSelectedProductToRemove(productId);
    setIsConfirmationModalVisible(true);
  };
  
  const confirmRemoveProduct = () => {
    if (selectedProductToRemove) {
      const updatedProdutos = user.produtos.filter((productId) => productId !== selectedProductToRemove);
      updateUser({ ...user, produtos: updatedProdutos }); // Update user's produtos array
      removeSale(user.id, selectedProductToRemove); // Remove sale from user's sales
      setIsConfirmationModalVisible(false);
      setSelectedProductToRemove(null);
    }
  };
  return (
    <View style={styles.container}>
      <CustomHeader title="Editar Usuário" showBackButton={true} showMenuButton={true} />
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={name}
          onChangeText={setName}
        />
        <Text style={styles.subHeading}>Produtos Atribuídos:</Text>
        <FlatList
          data={user.produtos}
          keyExtractor={() => uuidv4()}
          renderItem={({ item }) => (
            <View style={styles.productItem}>
              <Text>{productList.find((product) => product.id === item)?.name}</Text>
              <TouchableOpacity onPress={() => handleRemoveProduct(item)}>
                <Text style={styles.removeProductText}>Remover</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Cancelar" onPress={() => navigation.goBack()} color="#888" />
        <Button title="Salvar" onPress={handleUpdateUser} />
      </View>
      <Modal
        visible={isConfirmationModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsConfirmationModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>Deseja remover o produto?</Text>
          <View style={styles.modalButtonContainer}>
            <Button title="Cancelar" onPress={() => setIsConfirmationModalVisible(false)} color="#888" />
            <Button title="Remover" onPress={confirmRemoveProduct} color="red" />
          </View>
        </View>
      </Modal>
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
  subHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 20,
    borderRadius: 8,
  },
  input: {
    fontSize: 16,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  removeProductText: {
    color: 'red',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});