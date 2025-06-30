import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
      
      // Actualizar monedas automáticamente cuando se completan sesiones
      if (key === 'completedSessions') {
        const currentCoins = parseInt(localStorage.getItem('userCoins') || '0');
        const newCoins = Array.isArray(valueToStore) ? valueToStore.length : 0;
        if (newCoins > currentCoins) {
          localStorage.setItem('userCoins', JSON.stringify(newCoins));
        }
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}