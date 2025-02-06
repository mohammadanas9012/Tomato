import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});

    const addToCart = (itemId) => {
        setCartItems((prev) => {
            const newCount = prev[itemId] ? prev[itemId] + 1 : 1;
            console.log("Updating cart for itemId: ", itemId, "New Count: ", newCount);
            return { ...prev, [itemId]: newCount };
        });
    }
    
      

    const removeFromCart = (itemId) => {
        setCartItems((prev) => {
            if (prev[itemId] > 1) {
                console.log("Decreasing count for itemId: ", itemId);
                return { ...prev, [itemId]: prev[itemId] - 1 };
            } else {
                console.log("Removing itemId: ", itemId);
                const newCart = { ...prev };
                delete newCart[itemId]; // Removes the item if the count reaches 0
                return newCart;
            }
        });
    }
    

    useEffect(() => {
        console.log("Updated Cart Items:", cartItems);
    }, [cartItems]);

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
