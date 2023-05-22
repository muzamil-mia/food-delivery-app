import React from 'react'
import { IMG_CDN_URL } from '../constants'
import { AiFillStar } from "react-icons/ai";

const RestaurantInfo = (restaurant) => {
    return (
        <div className="flex basis-full h-60 justify-evenly items-center bg-blue-dark text-gray p-8">
            <img src={IMG_CDN_URL + restaurant?.cloudinaryImageId} alt={restaurant?.name} className='w-[254px] h-[165px] mob:w-[130px] mob:[81px]' />
            <div className="flex flex-col m-5 basis-[540px]">
                <h2 className="text-3xl max-w-[538px] font-semibold">{restaurant?.name}</h2>
                <p className="overflow-hidden whitespace-nowrap text-[15px] max-w-[538px]">
                    {restaurant?.cuisines.join(", ")}
                </p>
                <div className="flex mt-5 justify-between items-center text-sm font-semibold pb-2 5 mob:text-xs max-w-[342px] mob:font-normal">
                    <div className="flex items-center px-1 py-0 gap-1">
                        <AiFillStar />
                        <span>{restaurant?.avgRating}</span>
                    </div>
                    <div>|</div>
                    <div>{restaurant?.sla.slaString}</div>
                    <div>|</div>
                    <div>{restaurant?.costForTwoMsg}</div>
                </div>
            </div>
        </div>
    )
}

export default RestaurantInfo;
