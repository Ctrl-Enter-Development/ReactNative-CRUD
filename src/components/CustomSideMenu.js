import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const CustomSideMenu = ({ onClose }) => {
  const navigation = useNavigation();

  const handleMenuItemPress = (screenName) => {
    navigation.navigate(screenName);
    onClose(); // Fechar o menu após a navegação
  };

  return (
    <View style={styles.container}>
      <View style={styles.menu}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Feather name="x" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuItemPress('Home')}>
          <Feather name="home" size={24} color="black" style={styles.menuIcon} />
          <Text style={styles.menuText}>Página Inicial</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuItemPress('Usuários')}>
          <Feather name="users" size={24} color="black" style={styles.menuIcon} />
          <Text style={styles.menuText}>Usuários</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuItemPress('Produtos')}>
          <Feather name="package" size={24} color="black" style={styles.menuIcon} />
          <Text style={styles.menuText}>Produtos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuItemPress('Adicionar Venda')}>
          <Feather name="dollar-sign" size={24} color="black" style={styles.menuIcon} />
          <Text style={styles.menuText}>Adicionar Venda</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuItemPress('Configurações')}>
        <Feather name="settings" size={24} color="black" style={styles.menuIcon} />
        <Text style={styles.menuText}>Configurações</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: deviceWidth,
    height: deviceHeight,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  menu: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: deviceWidth * 0.8,
    maxHeight: deviceHeight * 0.8,
    paddingVertical: 20,
    paddingHorizontal: 20,
    overflow: 'hidden',
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  menuIcon: {
    marginRight: 10,
  },
  menuText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomSideMenu;
