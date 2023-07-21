import React, { createContext, useState, useEffect } from 'react';

const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(null);

    useEffect(() => {
        const storedCartInfo = localStorage.getItem('cartInfo');
        if (storedCartInfo) {
            setCartItems(JSON.parse(storedCartInfo));
        }
    }, []);

    const updateCartItems = (newCartItems) => {
        setCartItems(newCartItems);
        if (newCartItems) {
            localStorage.setItem('cartInfo', JSON.stringify(newCartItems));
        }
        else {
            localStorage.removeItem('cartInfo');
        }
    };

    return (
        <CartContext.Provider value={{ cartItems, updateCartItems }}>
            {children}
        </CartContext.Provider>
    );
};

export { CartContext, CartProvider };
