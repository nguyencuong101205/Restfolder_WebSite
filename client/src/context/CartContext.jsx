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
  const [appliedVoucher, setAppliedVoucher] = useState(() => {
    try {
      const saved = localStorage.getItem('hoanglong_voucher');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [paymentMethod, setPaymentMethod] = useState('cash'); // 'cash' | 'transfer' | 'card'

  useEffect(() => {
    try {
      localStorage.setItem('hoanglong_cart', JSON.stringify(cartItems));
    } catch (e) {}
  }, [cartItems]);

  useEffect(() => {
    try {
      if (appliedVoucher) {
        localStorage.setItem('hoanglong_voucher', JSON.stringify(appliedVoucher));
      } else {
        localStorage.removeItem('hoanglong_voucher');
      }
    } catch (e) {}
  }, [appliedVoucher]);

  /**
   * Apply a voucher code
   */
  const applyVoucher = (code) => {
    const normalized = (code || '').trim().toUpperCase();
    if (!normalized) {
      return { success: false, message: 'Vui lòng nhập mã giảm giá!' };
    }

    if (normalized === 'HOANGLONG10') {
      const voucher = {
        code: 'HOANGLONG10',
        title: 'Giảm 10% Hóa Đơn Bàn',
        discountType: 'percent',
        discountValue: 10,
        minOrder: 0
      };
      setAppliedVoucher(voucher);
      return { success: true, message: 'Áp dụng mã HOANGLONG10 thành công! Giảm 10% tổng đơn.' };
    }

    if (normalized === 'DIMSUM50') {
      const voucher = {
        code: 'DIMSUM50',
        title: 'Tặng Xửng Há Cảo Thủy Tinh (Giảm 50.000đ)',
        discountType: 'fixed',
        discountValue: 50000,
        minOrder: 150000
      };
      setAppliedVoucher(voucher);
      return { success: true, message: 'Áp dụng mã DIMSUM50 thành công! Giảm trực tiếp 50.000 đ.' };
    }

    if (normalized === 'LONGTINH') {
      const voucher = {
        code: 'LONGTINH',
        title: 'Tặng Ấm Trà Long Tỉnh Tây Hồ (Giảm 45.000đ)',
        discountType: 'fixed',
        discountValue: 45000,
        minOrder: 100000
      };
      setAppliedVoucher(voucher);
      return { success: true, message: 'Áp dụng mã LONGTINH thành công! Miễn phí 45.000 đ danh trà.' };
    }

    return { success: false, message: `Mã ưu đãi "${normalized}" không hợp lệ hoặc đã hết hạn.` };
  };

  const removeVoucher = () => {
    setAppliedVoucher(null);
  };

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

  // Discount calculation
  let discountAmount = 0;
  if (appliedVoucher && subtotal > 0) {
    if (appliedVoucher.discountType === 'percent') {
      discountAmount = Math.round(subtotal * (appliedVoucher.discountValue / 100));
    } else if (appliedVoucher.discountType === 'fixed') {
      discountAmount = Math.min(subtotal, appliedVoucher.discountValue);
    }
  }

  const taxableSubtotal = Math.max(0, subtotal - discountAmount);
  const vat = Math.round(taxableSubtotal * 0.08); // 8% VAT
  const total = taxableSubtotal + vat;
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
        appliedVoucher,
        applyVoucher,
        removeVoucher,
        paymentMethod,
        setPaymentMethod,
        subtotal,
        discountAmount,
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
