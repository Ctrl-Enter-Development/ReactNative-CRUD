import React, { createContext, useState, useContext } from 'react';

export const ProductContext = createContext();

export const useProductContext = () => {
  return useContext(ProductContext);
};

export const ProductProvider = ({ children }) => {
  const [productList, setProductList] = useState([]);

  const addProductToList = (product) => {
    setProductList([...productList, product]);
  };

  const updateProductInList = (editedProduct) => {
    const updatedList = productList.map((product) =>
      product.id === editedProduct.id ? editedProduct : product
    );
    setProductList(updatedList);
  };

  return (
    <ProductContext.Provider value={{ productList, addProductToList, updateProductInList }}>
      {children}
    </ProductContext.Provider>
  );
};
