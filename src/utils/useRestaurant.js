import { useState } from "react";
import { useEffect } from "react";
import { FETCH_MENU_URL } from "../constants";
const useRestaurant = (resId) => {

    const [restaurant, setRestaurant] = useState(null)


    //get data from API
    useEffect(() => {
        getRestaurantInfo();
    }, []);

    async function getRestaurantInfo() {
        try {

            // const response = await fetch("https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9715987&lng=77.5945627&restaurantId=" + resId + "&submitAction=ENTER");

            /// iNSTEAD OF DOING IT IN THE ABOVE WAY WE CAN OPTIMIZE IT
            const response = await fetch(FETCH_MENU_URL + resId)
            const json = await response.json();
            //         //console.log(json)
            setRestaurant(json?.data?.cards[0]?.card?.card?.info)


        } catch (error) {
            console.log(error)
        }
    }

    //return restaurant data
    return { restaurant };
    //return resMenu

};

export default useRestaurant;