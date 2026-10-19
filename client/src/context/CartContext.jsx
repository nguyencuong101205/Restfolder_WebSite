import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('hoanglong_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('hoanglong_cart', JSON.stringify(cartItems));
    } catch (e) {}
  }, [cartItems]);

  /**
   * Add item to cart with options (spiceLevel, toppings, note)
   */
  const addToCart = (dish, { quantity = 1, spiceLevel = 'Không cay', selectedToppings = [], note = '' }) => {
    // Generate unique key based on dish id and chosen customizations
    const toppingsKey = (selectedToppings || []).map(t => t.name).sort().join('|');
    const itemKey = `${dish.id}_${spiceLevel}_${toppingsKey}_${note}`;

    setCartItems(prev => {
      const existingIndex = prev.findIndex(item => item.itemKey === itemKey);
      if (existingIndex > -1) {
        const copy = [...prev];
        copy[existingIndex].quantity += quantity;
        return copy;
      } else {
        const newItem = {
          itemKey,
          id: dish.id,
          name: dish.name,
          hanzi: dish.hanzi,
          image: dish.image,
          price: dish.price,
          quantity,
          spiceLevel,
          selectedToppings: selectedToppings || [],
          note
        };
        return [...prev, newItem];
      }
    });

    // Provide visual feedback by briefly opening cart or badge
    setIsCartOpen(true);
  };

  const updateQuantity = (itemKey, delta) => {
    setCartItems(prev => {
      return prev
        .map(item => {
          if (item.itemKey === itemKey) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const removeFromCart = (itemKey) => {
    setCartItems(prev => prev.filter(item => item.itemKey !== itemKey));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Calculations
  const subtotal = cartItems.reduce((sum, item) => {
    let unitPrice = item.price;
    if (item.selectedToppings && item.selectedToppings.length > 0) {
      unitPrice += item.selectedToppings.reduce((tSum, t) => tSum + (t.price || 0), 0);
    }
    return sum + unitPrice * item.quantity;
  }, 0);

  const vat = Math.round(subtotal * 0.08); // 8% VAT
  const total = subtotal + vat;
  const totalItemsCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        subtotal,
        vat,
        total,
        totalItemsCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
