import { createContext, useState } from 'react';

export const QuantityContext = createContext();

export const QuantityProvider = ({ children }) => {
  const [quantities, setQuantities] = useState({}); // Store quantities of all items

  const updateQuantity = (itemId, newQuantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: newQuantity,
    }));
  };

  return (
    <QuantityContext.Provider value={{ quantities, updateQuantity }}>
      {children}
    </QuantityContext.Provider>
  );
};
