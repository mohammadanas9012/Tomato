import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});

    const addToCart = (itemId) => {
        if (!itemId) {
            console.error("❌ Error: itemId is undefined in addToCart!");
            return;
        }
    
        setCartItems((prev) => {
            const newCount = prev[itemId] ? prev[itemId] + 1 : 1;
            console.log("✅ Updating cart for itemId:", itemId, "New Count:", newCount);
            return { ...prev, [itemId]: newCount };
        });
    };
    

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
    

    const getTotalCartAmount=()=>{
        let totalAmount = 0;
        for(const item in cartItems)
        {
            if(cartItems[item] > 0){
                let itemInfo = food_list.find((product)=>product._id === item);
                totalAmount+= itemInfo.price * cartItems[item];
            }
            
        }
        return totalAmount;    
    }
    

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
