import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useRestaurant from "../utils/useRestaurant";
import useRestaurantMenu from "../utils/useRestaurantMenu";

import {
    swiggy_menu_api_URL,
    IMG_CDN_URL,
    ITEM_IMG_CDN_URL,
    swiggy_api_URL,
} from "../constants";

import { MenuShimmer } from "./Shimmer";

const RestaurantMenu = () => {
    const { resId } = useParams();
    //const [restaurant, setRestaurant] = useState({})
    //const [resMenu, setresMenu] = useState({})


    //BUILDING CUSTOM HOOK TO GET THE RESTAURANT DATA
    const restaurant = useRestaurant(resId)
      console.log(restaurant)

    //OPTIMIZING THE ABOVE CODE
    //BUILDING CUSTOM HOOK TO GET THE RESTAURANT INFO
    const resMenu = useRestaurantMenu(resId)
    //console.log(resMenu)



    return !restaurant ? (
        <MenuShimmer />
    ) : (
        <div className="container">
            <div className="flex basis-full h-60 justify-evenly items-center bg-blue-dark text-gray p-8">
                <img className = "w-[245px] h-[165px] mob:w-[130px] mob:[81px] " src={IMG_CDN_URL + restaurant?.restaurant?.cloudinaryImageId} alt={restaurant.name} />
                <div className="flex flex-col basis-[540px] m-5">
                    <h2 className="text-3xl max-w-[538px] font-semibold">{restaurant?.restaurant?.name}</h2>
                    {restaurant && restaurant.cuisines && (
                        <p className="overflow-hidden whitespace-nowrap text-[15px] max-w-[538px] ">
                            {restaurant?.restaurant?.cuisines.join(", ")}
                        </p>
                    )}
                    <div className="flex mt-5 justify-between items-center text-sm font-semibold pb-2.5 max-w[342px] mob:text-xs mob:font-normal">
                        <div className="flex items-center px-1 py-0 gap-1" style={
                            (restaurant?.restaurant?.avgRating) < 4
                                ? { backgroundColor: "var(--light-red)" }
                                : (restaurant?.restaurant?.avgRating) === "--"
                                    ? { backgroundColor: "white", color: "black" }
                                    : { color: "white" }
                        }>
                            <i class="ri-star-fill"></i>
                            <span>{restaurant?.restaurant?.avgRating}</span>
                        </div>
                        <div>|</div>
                        {restaurant && restaurant?.restaurant?.sla && (
                            <div>{restaurant?.restaurant?.sla.slaString}</div>
                        )}
                        <div>|</div>
                        <div>{restaurant?.restaurant?.costForTwoMessage}</div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="mt-7 w-[848px]">
                    <div className="p-5">
                        <h3 className="font-bold text-lg">
                            Recommended
                        </h3>
                        <p className="mt-3.5 w-3/5 text-gray-desc text-sm">
                            {resMenu && resMenu.info && Object.keys(resMenu.info).length} ITEMS
                        </p>
                    </div>
                    <div className="fle flex-col justify-evenly">
                        {resMenu && resMenu.length && resMenu.map((element) => (
                            <div className="flex justify-between basis-[848px] max-h-[250px] p-5 border-b border-gray" key={element.card.id}>
                                <div className="menu-item-details">
                                    <h3 className="font-bold text-lg w-3/5">
                                        {element.card.info.name}
                                    </h3>
                                    <p className="mt-1 text-base font-normal">
                                        {element?.card?.info?.price > 0
                                            ? new Intl.NumberFormat("en-IN", {
                                                style: "currency",
                                                currency: "INR",
                                            }).format(element?.card?.info?.price / 100)
                                            : " "}
                                    </p>
                                    <p className="mt-3.5 leading-5 text-gray-desc w--4/5 text-base overflow-hidden">{element?.card?.info?.description}</p>
                                    </div>
                                    <div className="flex flex-col justify-center items-center w-[118px] h-[150px]">
                                        <img className="w-[118px] h-[96px]" src={`${ITEM_IMG_CDN_URL}${element?.card?.info?.imageId}`} alt={element?.card?.info?.name} />
                                        <button className="btn btn--primary w-[118px] h-[34px] mt-2.5"> ADD +</button>
                                    </div>
                                </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    )
}


export default RestaurantMenu