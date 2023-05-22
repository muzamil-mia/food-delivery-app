import { useParams } from "react-router-dom";
import { MenuShimmer } from "./Shimmer";
import useRestaurant from "../utils/useRestaurant";
import RestaurantInfo from "./RestaurantInfo";
import RestaurantMenuList from "./RestaurantMenuList"

const RestaurantDetails = () => {
    const { resId } = useParams();

    const restaurant = useRestaurant(resId);
    console.log(restaurant)
    /* Passing resId to Custom Hooks to fetch restaurant details and returns it */

    return !restaurant ? (
        <MenuShimmer />
    ) : (
        <div className="container">
            <RestaurantInfo {...restaurant.info} />
            <RestaurantMenuList menu={restaurant.menu} />
        </div>
    )
};
export default RestaurantDetails;