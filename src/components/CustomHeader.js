import React, { useState } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';
import CustomSideMenu from './CustomSideMenu'; // Importe o componente do menu lateral personalizado

export function CustomHeader({ title, showBackButton, showMenuButton }) {
  const navigation = useNavigation();
  const [isMenuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  return (
    <View style={styles.container}>
      <Modal isVisible={isMenuVisible} onBackdropPress={toggleMenu}>
        <CustomSideMenu onClose={toggleMenu} />
      </Modal>

      {showBackButton ? (
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
          <Feather name="chevron-left" size={24} color="black" />
        </TouchableOpacity>
      ) : null}

      <Text style={styles.headerTitle}>{title}</Text>

      {showMenuButton ? (
        <TouchableOpacity onPress={toggleMenu} style={styles.iconButton}>
          <Feather name="menu" size={24} color="black" />
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    textAlign: 'center',
    height: 56, // Altura do cabeçalho
  },
  headerTitle: {
    flex: 1, // Ocupa o espaço disponível
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  iconButton: {
    padding: 10,
  },
});
