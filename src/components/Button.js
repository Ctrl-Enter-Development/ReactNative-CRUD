import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const Button = ({ onPress, title, iconName }) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
    >
      <MaterialIcons name={iconName} size={30} color="#007bff" />
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007bff',
    marginBottom: 10,
    elevation: 2, // Sombra para dar profundidade
  },
  buttonText: {
    marginLeft: 10,
    color: '#007bff',
    fontSize: 18,
    fontWeight: 'bold', // Texto mais destacado
  },
});

export default Button;
