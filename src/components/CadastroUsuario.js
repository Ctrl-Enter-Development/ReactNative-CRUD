import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import * as FileSystem from 'expo-file-system';

const CadastroUsuario = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');

  const cadastrarUsuario = async () => {
    const newUser = {
      nome,
      email,
    };

    const path = FileSystem.documentDirectory + 'database.json';

    try {
      let data = '';
      let jsonData = { usuarios: [], produtos: [] };

      try {
        data = await FileSystem.readAsStringAsync(path);
        jsonData = JSON.parse(data);
      } catch (error) {
        // Arquivo não existe, criamos ele com a estrutura inicial
        await FileSystem.writeAsStringAsync(path, JSON.stringify(jsonData));
      }

      jsonData.usuarios.push(newUser);

      await FileSystem.writeAsStringAsync(path, JSON.stringify(jsonData));

      setFeedback('Usuário cadastrado com sucesso!');
      setNome('');
      setEmail('');
    } catch (error) {
      setFeedback('Erro ao cadastrar o usuário. Tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome:</Text>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
      />

      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <Button title="Cadastrar" onPress={cadastrarUsuario} />
      {feedback !== '' && <Text style={styles.feedback}>{feedback}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  feedback: {
    marginTop: 10,
    color: 'green',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default CadastroUsuario;
