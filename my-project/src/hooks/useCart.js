import { useState, useEffect } from 'react';

export const useCart = () => {
  const [cart, setCart] = useState([]);

  // Загрузка корзины из localStorage при монтировании
  useEffect(() => {
    console.log('🔄 Загрузка корзины из localStorage...');
    const savedCart = localStorage.getItem('cart');
    console.log('📦 Данные из localStorage:', savedCart);
    
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        console.log(' Корзина загружена:', parsedCart);
        setCart(parsedCart);
      } catch (error) {
        console.error(' Ошибка парсинга корзины:', error);
        localStorage.removeItem('cart');
      }
    } else {
      console.log('📭 localStorage пуст');
    }
  }, []);

  // Сохранение корзины в localStorage при изменении
  useEffect(() => {
    console.log(' Сохранение корзины в localStorage:', cart);
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Проверим, что сохранилось
    const checkStorage = localStorage.getItem('cart');
    console.log(' Проверка сохранения:', checkStorage);
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    console.log(' Добавление в корзину:', product, 'количество:', quantity);
    
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      
      if (existingItem) {
        const newCart = prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        console.log(' Обновлен существующий товар. Новая корзина:', newCart);
        return newCart;
      } else {
        const newCart = [...prevCart, { ...product, quantity }];
        console.log(' Добавлен новый товар. Новая корзина:', newCart);
        return newCart;
      }
    });
  };

  const removeFromCart = (productId) => {
    console.log('🗑️ Удаление из корзины:', productId);
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    console.log('🔢 Изменение количества:', productId, 'на', quantity);
    
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    console.log('🧹 Очистка корзины');
    setCart([]);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems
  };
};