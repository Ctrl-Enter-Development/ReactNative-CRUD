import React, { createContext, useState, useContext, useEffect } from 'react';
import * as FileSystem from 'expo-file-system';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [productList, setProductList] = useState([]);

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
  };

  const loadData = async () => {
    try {
      const content = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + 'database.json');
      setProductList(JSON.parse(content));
    } catch (error) {
      console.log('Error reading data:', error);
    }
  };

  const saveData = async () => {
    try {
      await FileSystem.writeAsStringAsync(FileSystem.documentDirectory + 'database.json', JSON.stringify(productList));
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

  return (
    <ProductContext.Provider value={{ productList, addProductToList, updateProduct, removeProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => useContext(ProductContext);
