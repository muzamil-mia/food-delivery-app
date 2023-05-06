import { useState } from "react";
import { useEffect } from "react";

const useRestaurantMenu = (resId) => {

   
    const [resMenu, setresMenu] = useState({})

    //get data from API
    useEffect(() => {
             getRestaurantInfo();
         }, []);
    
         async function getRestaurantInfo() {
             try {
                const response = await fetch("https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9715987&lng=77.5945627&restaurantId=" + resId + "&submitAction=ENTER");
                 const json = await response.json();
        //         //console.log(json)
        
        //         //console.log(json?.data?.cards[1]?.card?.card)
                 setresMenu(json?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card?.itemCards)
                // console.log(resMenu)
             } catch (error) {
                 console.log(error)
             }
         }

    //return restaurant data
    return  resMenu;
    //return resMenu
    
};

export default useRestaurantMenu;