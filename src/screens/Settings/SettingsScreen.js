import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { CustomHeader } from '../../components/CustomHeader';

import * as FileSystem from 'expo-file-system';

export default function SettingsScreen() {
  const [exportedJSON, setExportedJSON] = useState(null);

  const handleExportData = async () => {
    const data = {
      users: [{ name: 'Usuário 1' }, { name: 'Usuário 2' }],
      products: [{ name: 'Produto 1' }, { name: 'Produto 2' }],
      assignments: [{ user: 'Usuário 1', product: 'Produto 1' }],
    };

    try {
      const json = JSON.stringify(data);
      setExportedJSON(json);

      const fileUri = `${FileSystem.documentDirectory}database.json`; // Alterado para database.json
      await FileSystem.writeAsStringAsync(fileUri, json, { encoding: FileSystem.EncodingType.UTF8 });

      Alert.alert('Sucesso', 'Dados exportados com sucesso! Você pode encontrar o arquivo em Downloads.');
    } catch (error) {
      console.error('Erro ao exportar dados:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao exportar os dados. Tente novamente.');
    }
  };

  const handleViewJSON = () => {
    if (exportedJSON) {
      Alert.alert('JSON Exportado', exportedJSON);
    } else {
      Alert.alert('Aviso', 'Você precisa exportar os dados antes de visualizar o JSON.');
    }
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
  },
  viewIcon: {
    marginRight: 10,
  },
  viewText: {
    color: '#007bff',
    fontSize: 16,
  },
});
