import { useContext } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../Context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ category }) => {
    const { food_list } = useContext(StoreContext);
    console.log("✅ food_list:", food_list);

    return (
        <div className='food-display'>
            <h2>Top Dishes Near You</h2>
            <div className="food-display-list">
                {food_list.map((item) => {
                    if (category === "All" || category === item.category) {
                        return (
                            <FoodItem 
                                key={item._id} 
                                id={item._id}  // FIX: Ensure we pass `id` correctly
                                name={item.name} 
                                price={item.price} 
                                description={item.description} 
                                image={item.image} 
                            />
                        );
                    }
                    return null; 
                })}
            </div>
        </div>
    );
};

export default FoodDisplay;
