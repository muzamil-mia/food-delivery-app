import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
    swiggy_menu_api_URL,
    IMG_CDN_URL,
    ITEM_IMG_CDN_URL,
    swiggy_api_URL,
} from "../constants";

import { MenuShimmer } from "./Shimmer";

const RestaurantMenu = () => {
    const { resId } = useParams();
    const [restaurant, setRestaurant] = useState({})
    const [resMenu, setresMenu] = useState({})

    useEffect(() => {
        getRestaurantInfo();
    }, []);

    async function getRestaurantInfo() {
        try {
            const response = await fetch("https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9715987&lng=77.5945627&restaurantId=" + resId + "&submitAction=ENTER");
            const json = await response.json();
            //console.log(json)
            setRestaurant(json?.data?.cards[0]?.card?.card?.info)
            //console.log(json?.data?.cards[1]?.card?.card)
            setresMenu(json?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card?.itemCards)
            //console.log(resMenu)
        } catch (error) {
            console.log(error)
        }
    }

    return !restaurant ? (
        <MenuShimmer />
    ) : (
        <div className="restaurant-menu">
            <div className="restaurant-summary">
                <img src={IMG_CDN_URL + restaurant?.cloudinaryImageId} alt={restaurant.name} className="restaurant-img" />
                <div className="restaurant-summary-details">
                    <h2 className="restaurant-title">{restaurant?.name}</h2>
                    {restaurant && restaurant.cuisines && (
                        <p className="restaurant-tags">
                            {restaurant.cuisines.join(", ")}
                        </p>
                    )}
                    <div className="restaurant-details">
                        <div className="restaurant-rating" style={
                            (restaurant?.avgRating) < 4
                                ? { backgroundColor: "var(--light-red)" }
                                : (restaurant?.avgRating) === "--"
                                    ? { backgroundColor: "white", color: "black" }
                                    : { color: "white" }
                        }>
                            <i class="ri-star-fill"></i>
                            <span>{restaurant?.avgRating}</span>
                        </div>
                        <div>|</div>
                        {restaurant && restaurant.sla && (
                            <div>{restaurant.sla.slaString}</div>
                        )}
                        <div>|</div>
                        <div>{restaurant?.costForTwoMsg}</div>
                    </div>
                </div>
            </div>

            <div className="restaurant-menu-content">
                <div className="menu-items-container">
                    <div className="menu-title-wrap">
                        <h3 className="menu-title">
                            Recommended
                        </h3>
                        <p className="menu-count">
                            {resMenu && resMenu.info && Object.keys(resMenu.info).length} ITEMS
                        </p>
                    </div>
                    <div className="menu-items-list">
                        {resMenu && resMenu.length && resMenu.map((element) => (
                            <div className="menu-item" key={element.card.id}>
                                <div className="menu-item-details">
                                    <h3 className="item-title">
                                        {element.card.info.name}
                                    </h3>
                                    <p className="item-cost">
                                        {element?.card?.info?.price > 0
                                            ? new Intl.NumberFormat("en-IN", {
                                                style: "currency",
                                                currency: "INR",
                                            }).format(element?.card?.info?.price / 100)
                                            : " "}
                                    </p>
                                    <p className="item-desc">{element?.card?.info?.description}</p>
                                    <div className="menu-img-wrapper">
                                        <img className="menu-item-img" src={`${ITEM_IMG_CDN_URL}${element?.card?.info?.imageId}`} alt={element?.card?.info?.name} />
                                        <button className="add-btn"> ADD +</button>
                                    </div>
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