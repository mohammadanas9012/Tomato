import { useContext } from 'react';
import './FoodItem.css';
import { StoreContext } from '../../Context/StoreContext';
import { assets } from '../../assets/assets';

const FoodItem = ({ id, name, price, description, image }) => {  // FIX: Change _id to id
    console.log("Rendering FoodItem with id:", id);

    const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);

    const handleAddToCart = () => {
        console.log("Clicked Add for id:", id);
        addToCart(id);  // FIX: Ensure `id` is passed
    };

    const handleRemoveFromCart = () => {
        console.log("Clicked Remove for id:", id);
        removeFromCart(id);  // FIX: Ensure `id` is passed
    };

    return (
        <div className='food-item'>
            <div className="food-item-img-container">
                <img className='food-item-image' src={image} alt={name} />
                
                {!cartItems[id] ? (
                    <img className='add' onClick={handleAddToCart} src={assets.add_icon_white} alt="Add to cart" />
                ) : (
                    <div className="food-item-counter">
                        <img onClick={handleRemoveFromCart} src={assets.remove_icon_red} alt="Remove from cart" />
                        <p>{cartItems[id]}</p>
                        <img onClick={handleAddToCart} src={assets.add_icon_green} alt="Add more" />
                    </div>
                )}
            </div>
            <div className="food-item-info">
                <p>{name} (ID: {id})</p> {/* Display ID to debug */}
                <p className="food-item-price">${price}</p>
            </div>
        </div>
    );
};

export default FoodItem;
