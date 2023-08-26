import React, { createContext, useState, useContext, useEffect } from 'react';
import * as FileSystem from 'expo-file-system';
import { dataPath } from '../constants/constants';

export const SaleContext = createContext();

export function useSaleContext() {
  return useContext(SaleContext);
}

export const SaleProvider = ({ children }) => {
  const [salesList, setSalesList] = useState([]);
  const salesDataPath = `${FileSystem.documentDirectory}sales.json`;

  useEffect(() => {
    const loadSalesData = async () => {
      try {
        const content = await FileSystem.readAsStringAsync(salesDataPath);
        setSalesList(JSON.parse(content));
      } catch (error) {
        console.log('Error reading sales data:', error);
      }
    };

    loadSalesData();
  }, []);

  const saveSalesData = async () => {
    try {
      await FileSystem.writeAsStringAsync(salesDataPath, JSON.stringify(salesList));
    } catch (error) {
      console.log('Error writing sales data:', error);
    }
  };

  const clearSalesData = async () => {
    try {
      setSalesList([]);
      await FileSystem.deleteAsync(salesDataPath);
    } catch (error) {
      console.error('Error clearing sales data:', error);
    }
  };

  const addSale = (sale) => {
    setSalesList([...salesList, sale]);
  };

  const importSales = (importedSales) => {
    setSalesList(importedSales);
    saveSalesData();
  };

  const removeSale = (saleId) => {
    const updatedSalesList = salesList.filter(sale => sale.id !== saleId);
    setSalesList(updatedSalesList);
    saveSalesData();
  };

  return (
    <SaleContext.Provider
      value={{
        addSale,
        salesList,
        clearSalesData,
        importSales,
        removeSale,
      }}
    >
      {children}
    </SaleContext.Provider>
  );
};
