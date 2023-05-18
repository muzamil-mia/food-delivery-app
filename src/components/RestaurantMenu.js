// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import useRestaurant from "../utils/useRestaurant";
// import useRestaurantMenu from "../utils/useRestaurantMenu";

// import {
//     swiggy_menu_api_URL,
//     IMG_CDN_URL,
//     ITEM_IMG_CDN_URL,
//     swiggy_api_URL,
// } from "../constants";

// import { MenuShimmer } from "./Shimmer";

// const RestaurantMenu = () => {
//     const { resId } = useParams();
//     //const [restaurant, setRestaurant] = useState({})
//     //const [resMenu, setresMenu] = useState({})


//     //BUILDING CUSTOM HOOK TO GET THE RESTAURANT DATA
//     const restaurant = useRestaurant(resId)
//       console.log(restaurant)

//     //OPTIMIZING THE ABOVE CODE
//     //BUILDING CUSTOM HOOK TO GET THE RESTAURANT INFO
//     const resMenu = useRestaurantMenu(resId)
//     //console.log(resMenu)



//     return !restaurant ? (
//         <MenuShimmer />
//     ) : (
//         <div className="container">
//             <div className="flex basis-full h-60 justify-evenly items-center bg-blue-dark text-gray p-8">
//                 <img className = "w-[245px] h-[165px] mob:w-[130px] mob:[81px] " src={IMG_CDN_URL + restaurant?.restaurant?.cloudinaryImageId} alt={restaurant.name} />
//                 <div className="flex flex-col basis-[540px] m-5">
//                     <h2 className="text-3xl max-w-[538px] font-semibold">{restaurant?.restaurant?.name}</h2>
//                     {restaurant && restaurant.cuisines && (
//                         <p className="overflow-hidden whitespace-nowrap text-[15px] max-w-[538px] ">
//                             {restaurant?.restaurant?.cuisines.join(", ")}
//                         </p>
//                     )}
//                     <div className="flex mt-5 justify-between items-center text-sm font-semibold pb-2.5 max-w[342px] mob:text-xs mob:font-normal">
//                         <div className="flex items-center px-1 py-0 gap-1" style={
//                             (restaurant?.restaurant?.avgRating) < 4
//                                 ? { backgroundColor: "var(--light-red)" }
//                                 : (restaurant?.restaurant?.avgRating) === "--"
//                                     ? { backgroundColor: "white", color: "black" }
//                                     : { color: "white" }
//                         }>
//                             <i class="ri-star-fill"></i>
//                             <span>{restaurant?.restaurant?.avgRating}</span>
//                         </div>
//                         <div>|</div>
//                         {restaurant && restaurant?.restaurant?.sla && (
//                             <div>{restaurant?.restaurant?.sla.slaString}</div>
//                         )}
//                         <div>|</div>
//                         <div>{restaurant?.restaurant?.costForTwoMessage}</div>
//                     </div>
//                 </div>
//             </div>

//             <div className="flex justify-center sm:flex-col xsm:flex-col mob:flex-col">
//                 <div className="mt-7 xl:w-[70%] md:w-[70%] card-container">
//                     <div className="p-5">
//                         <h3 className="font-bold text-lg">
//                             Recommended
//                         </h3>
//                         <p className="mt-3.5 w-3/5 text-gray-desc text-sm">
//                             {resMenu && resMenu.info && Object.keys(resMenu.info).length} ITEMS
//                         </p>
//                     </div>
//                     <div className="flex flex-col justify-evenly">
//                         {resMenu && resMenu.length && resMenu.map((element) => (
//                             <div className="flex justify-between basis-[848px] max-h-[250px] p-5 border-b border-gray" key={element.card.id}>
//                                 <div className="menu-item-details">
//                                     <h3 className="font-bold text-lg w-3/5">
//                                         {element.card.info.name}
//                                     </h3>
//                                     <p className="mt-1 text-base font-normal">
//                                         {element?.card?.info?.price > 0
//                                             ? new Intl.NumberFormat("en-IN", {
//                                                 style: "currency",
//                                                 currency: "INR",
//                                             }).format(element?.card?.info?.price / 100)
//                                             : " "}
//                                     </p>
//                                     <p className="mt-3.5 leading-5 text-gray-desc w--4/5 text-base overflow-hidden">{element?.card?.info?.description}</p>
//                                     </div>
//                                     <div className="flex flex-col justify-center items-center w-[118px] h-[150px]">
//                                         <img className="w-[118px] h-[96px]" src={`${ITEM_IMG_CDN_URL}${element?.card?.info?.imageId}`} alt={element?.card?.info?.name} />
//                                         <button className="btn btn--primary w-[118px] h-[34px] mt-2.5"> ADD +</button>
//                                     </div>
//                                 </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>

//         </div>
//     )
// }


// export default RestaurantMenu

import { useParams } from "react-router-dom";
import useRestaurant from "../utils/useRestaurant";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import { MenuShimmer } from "./Shimmer";
import { ITEM_IMG_CDN } from "../constants";
import { AiFillStar } from "react-icons/ai";
import { useSelector } from "react-redux";
import useItemTotal from "../utils/useItemTotal";
import ItemQuantity from './ItemQuantity';
import MenuItem from './MenuItem.js'
import { Link } from "react-router-dom";
import CartFallback from "../components/CartFallback";

const RestaurantMenu = () => {
    const { resId } = useParams() //Read dynamic url params

    const restaurant = useRestaurant(resId);
    ; //passing resId to custom hooks to fetch restaurant details and returns it
    const resMenu = useRestaurantMenu(resId)

    //get cart items from redux store
    const cartItems = useSelector((store) => store.cart.items);
    //get total price for cart items
    const getItemTotal = useItemTotal();

    return !restaurant ? (
        <MenuShimmer />
    ) : (
        <div className="container">
            <div className="flex basis-full h-60 justify-evenly items-center bg-blue-dark text-gray p-8">
                <img className="w-[254px] h-[165px] mob:w-[130px] mob:[81px]"
                    src={ITEM_IMG_CDN + restaurant?.restaurant?.cloudinaryImageId}
                    alt={restaurant?.name} />
                <div className="flex flex-col basis-[540px] m-5">
                    <h2 className="text-3xl max-w[538px] font-semibold">{restaurant?.restaurant?.name}</h2>
                    <p className="overflow-hidden whitespace-nowrap text-[15px] max-w-[538px]">{restaurant?.restaurant?.cuisines.join(", ")}</p>
                    <div className="flex mt-5 justify-between items-center text-sm font-semibold pb-2 5 max-w-[342px] mob:text-xs mob:font-normal">
                        <div className="flex items-center px-1 py-0 gap-1">
                            <AiFillStar />
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


            <div className="flex justify-center sm:flex-col xsm:flex-col mob:flex-col">
                <div className="mt-7 xl:w-[70%] lg:w-[70%] md:w-[70%] card-container">
                    <div className="p-5">
                        <h3 className="font-bold text-lg">Recommended</h3>
                        <p className="mt-3.5 w-3/5 text-gray-desc text-sm">
                            {resMenu && resMenu.info && Object.keys(resMenu.info).length} ITEMS
                        </p>
                    </div>
                    <div className="flex flex-col justify-evenly">
                        {resMenu && resMenu.length && resMenu.map((element) => (
                            <MenuItem key={element.id} item={element} />
                        ))}
                    </div>
                </div>
                <div className="basis-[30%]">
                    {Object.values(cartItems).length > 0 ? (
                        <div className=" card-container basis-[298px] p-10">
                            <h1 className="font-bold text-lg mt-2.5">Cart</h1>

                            <p className="text-gray-count">
                                {Object.values(cartItems).length} item
                            </p>

                            {Object.values(cartItems).map((item) => {
                                return (
                                    <div className="flex items-center mt-2 justify-between">
                                        <p className="w-40 text-sm">{item.name}</p>
                                        <div className="w-30 px-5">
                                            <ItemQuantity item={item} key={item.id} />
                                        </div>

                                        <p className="w-10 font-thin text-sm">
                                            {"₹ " + (item.price / 100) * item.quantity}
                                        </p>
                                    </div>
                                );
                            })};
                            <div className="border border-gray my-4"></div>
                            <div className="flex justify-between mt-4">
                                <p className="text-sm text-bio">Sub Total</p>
                                {"₹ " + getItemTotal()}
                            </div>
                            <div className="flex-justify-center mt-10">
                                <Link to="/cart">
                                    {" "}
                                    <button className="bg-yellow px-4 py-2 text-blue-dark hover:drop-shadow-lg backdrop-blur">{" "}
                                        CHECKOUT
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="card-container w-[348px]">
                            <CartFallback
                                text={
                                    "Good food is always cooking! Go ahead, order some yummy items from the menu."
                                }
                            />
                        </div>
                    )}
                </div>
                </div>
                </div>
                );
}

export default RestaurantMenu;