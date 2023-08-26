import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { CustomHeader } from '../../components/CustomHeader';
import { useUserContext } from '../../contexts/UserContext';
import { useSaleContext } from '../../contexts/SaleContext';
import { useProductContext } from '../../contexts/ProductContext';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as DocumentPicker from 'expo-document-picker';

export default function SettingsScreen() {
  const { users, clearUsers, importUsers } = useUserContext();
  const { productList, clearProductsData, importProducts } = useProductContext();
  const { salesList, clearSalesData, importSales, removeSale } = useSaleContext();


  const handleClearData = () => {
    Alert.alert(
      'Apagar Dados',
      'Tem certeza de que deseja apagar todos os dados?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Apagar', onPress: () => clearData() },
      ]
    );
  };

  const handleExportData = async () => {
    try {
      const dataToExport = JSON.stringify({ users, productList, salesList });
      const fileUri = `${FileSystem.documentDirectory}exported_data.json`;

      await FileSystem.writeAsStringAsync(fileUri, dataToExport);

      const downloadUrl = await FileSystem.getContentUriAsync(fileUri);

      Sharing.shareAsync(downloadUrl);
    } catch (error) {
      console.error('Erro ao fazer download do JSON:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao fazer o download do JSON. Tente novamente.');
    }
  };

  const handleViewJSON = () => {
    const jsonData = { users, productList, salesList };
    const content = JSON.stringify(jsonData, null, 2); // The third argument is for formatting
    Alert.alert('JSON Data', content);
  };

  const clearData = async () => {
    try {
      clearUsers();
      clearProductsData();
      clearSalesData(); // Chama a função para limpar vendas
      Alert.alert('Sucesso', 'Dados apagados com sucesso!');
    } catch (error) {
      console.error('Erro ao apagar os dados:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao apagar os dados. Tente novamente.');
    }
  };

  const handleImportData = async () => {
    try {
      const document = await DocumentPicker.getDocumentAsync({ type: 'application/json' });
  
      if (document.type === 'success') {
        const fileUri = document.uri;
        const content = await FileSystem.readAsStringAsync(fileUri);
        const importedData = JSON.parse(content);
  
        const {
          users: importedUsers,
          productList: importedProducts,
          salesList: importedSales,
        } = importedData;
  
        // Use the imported context functions to update the data
        importUsers(importedUsers);
        importProducts(importedProducts);
        importSales(importedSales);
  
        Alert.alert('Sucesso', 'Dados importados com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao importar o JSON:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao importar o JSON. Tente novamente.');
    }
  };

  const handleRemoveSale = (saleId) => {
    Alert.alert(
      'Remover Venda',
      'Tem certeza de que deseja remover esta venda?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Remover', onPress: () => removeSale(saleId) },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <CustomHeader title="Configurações" showBackButton={false} showMenuButton={true} />
      <View style={styles.content}>
        <TouchableOpacity onPress={handleExportData} style={styles.exportButton}>
          <Feather name="download" size={24} color="black" style={styles.exportIcon} />
          <Text style={styles.exportText}>Exportar Dados</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleViewJSON} style={styles.viewButton}>
          <Feather name="eye" size={24} color="black" style={styles.viewIcon} />
          <Text style={styles.viewText}>Visualizar JSON</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleImportData} style={styles.viewButton}>
          <Feather name="upload" size={24} color="black" style={styles.viewIcon} />
          <Text style={styles.viewText}>Importar JSON</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleClearData} style={styles.viewButton}>
          <Feather name="trash-2" size={24} color="black" style={styles.viewIcon} />
          <Text style={styles.viewText}>Apagar Dados e Arquivo JSON</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007bff',
    marginBottom: 10,
  },
  exportIcon: {
    marginRight: 10,
  },
  exportText: {
    color: '#007bff',
    fontSize: 16,
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007bff',
    marginBottom: 10,
  },
  viewIcon: {
    marginRight: 10,
  },
  viewText: {
    color: '#007bff',
    fontSize: 16,
  },
});
