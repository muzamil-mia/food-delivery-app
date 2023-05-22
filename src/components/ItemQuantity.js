import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem, removeItem } from "../utils/cartSlice";
import { useSelector } from "react-redux";

const ItemQuantity = ({item}) => {
    //console.log(item)

    const dispatch = useDispatch();


    return (
        <div className="flex border border-gray w-16 justify-around items-center">
            <button onClick={() => {dispatch(removeItem(item.id))}}>-</button>
            {/* <span className="text-base text-green">{itemCount}</span> */}
            <p className="text-green text-sm">{item?.Quantity}</p>
            <button className="hover:scale-110 transition-all" onClick={() =>  {dispatch(addItem(item));
            console.log("item added to cart")
            }}
            
            >
                +
            </button>
        </div>
    )
}

export default ItemQuantity;