import React, { createContext, useState, useContext, useEffect } from 'react';
import * as FileSystem from 'expo-file-system';
import { dataPath } from '../constants/constants';

export const ProductContext = createContext();

export function useProductContext() {
  return useContext(ProductContext);
}

export const ProductProvider = ({ children }) => {
  const [productList, setProductList] = useState([]);
  const [salesList, setSalesList] = useState([])

  const addProductToList = (product) => {
    setProductList([...productList, product]);
  };

  const updateProduct = (updatedProduct) => {
    setProductList((prevList) =>
      prevList.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

  const removeProduct = (productId) => {
    setProductList((prevList) => prevList.filter((product) => product.id !== productId));
    
    const updatedUsers = users.map((user) => ({
      ...user,
      produtos: user.produtos.filter((userProductId) => userProductId !== productId), // Correção aqui
    }));
    
    setUsers(updatedUsers);
    saveUsersToStorage(updatedUsers);
  };

  const loadData = async () => {
    try {
      const content = await FileSystem.readAsStringAsync(dataPath);
      setProductList(JSON.parse(content));
    } catch (error) {
      console.log('Error reading data:', error);
    }
  };

  const saveData = async () => {
    try {
      await FileSystem.writeAsStringAsync(dataPath, JSON.stringify(productList));
    } catch (error) {
      console.log('Error writing data:', error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    saveData();
  }, [productList]);

  const clearProductsData = async () => {
    try {
      setProductList([]); // Limpar a lista de produtos
      await FileSystem.deleteAsync(FileSystem.documentDirectory + 'database.json'); // Apagar o arquivo JSON
    } catch (error) {
      console.error('Error clearing products data:', error);
    }
  };

  const addSale = (sale) => {
    setSalesList([...salesList, sale]);
  };

  const importProducts = (importedProducts) => {
    setProductList(importedProducts);
    saveData(); // Salva os produtos importados no armazenamento
  };

  return (
    <ProductContext.Provider
      value={{
        addSale,
        salesList,
        productList,
        addProductToList,
        updateProduct,
        removeProduct,
        clearProductsData,
        importProducts, // Adicione a função de importação ao contexto
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};