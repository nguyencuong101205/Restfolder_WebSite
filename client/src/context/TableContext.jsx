import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { orderApi } from '../api/orderApi';

const TableContext = createContext(null);

export const TableProvider = ({ children }) => {
  // Check URL query ?table=XX, or localStorage, or default to "08"
  const [tableNumber, setTableNumber] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const tblParam = params.get('table');
    if (tblParam) return tblParam;
    return localStorage.getItem('hoanglong_current_table') || '08';
  });

  const [activeOrder, setActiveOrder] = useState(null);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [isOrderTrackerOpen, setIsOrderTrackerOpen] = useState(false);
  const [isCallStaffModalOpen, setIsCallStaffModalOpen] = useState(false);

  // Synchronize table to localStorage & query string
  const changeTable = (newTable) => {
    const cleanTable = String(newTable).trim();
    setTableNumber(cleanTable);
    localStorage.setItem('hoanglong_current_table', cleanTable);

    // Update browser URL without reloading
    const url = new URL(window.location);
    url.searchParams.set('table', cleanTable);
    window.history.replaceState({}, '', url);

    // Refresh active order
    fetchActiveOrder(cleanTable);
  };

  const fetchActiveOrder = useCallback(async (tableToFetch = tableNumber) => {
    if (!tableToFetch) return;
    try {
      const res = await orderApi.getActiveTableOrder(tableToFetch);
      if (res && res.success) {
        setActiveOrder(res.data || null);
      }
    } catch (err) {
      // Backend not running or table has no active orders
    }
  }, [tableNumber]);

  // Periodic polling for kitchen status updates (every 6 seconds)
  useEffect(() => {
    fetchActiveOrder();
    const interval = setInterval(() => {
      fetchActiveOrder();
    }, 6000);
    return () => clearInterval(interval);
  }, [fetchActiveOrder]);

  return (
    <TableContext.Provider
      value={{
        tableNumber,
        changeTable,
        activeOrder,
        setActiveOrder,
        fetchActiveOrder,
        isQRModalOpen,
        setIsQRModalOpen,
        isOrderTrackerOpen,
        setIsOrderTrackerOpen,
        isCallStaffModalOpen,
        setIsCallStaffModalOpen
      }}
    >
      {children}
    </TableContext.Provider>
  );
};

export const useTable = () => {
  const context = useContext(TableContext);
  if (!context) throw new Error('useTable must be used within a TableProvider');
  return context;
};
