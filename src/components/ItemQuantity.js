import React from "react";
import { useDispatch } from "react-redux";
import { addItem, removeItem } from "../utils/cartSlice";

const ItemQuantity = ({item}) => {
    const dispatch = useDispatch();

    return (
        <div className="flex border border-gray w-16 justify-around items-center">
            <button onClick={() => {
                dispatch(removeItem(item.id));
            }} className="text-xl">
                -
            </button>
            <p className="text-green text-sm">{item.Quantity}</p>
            <button className="hover:scale-100 transition-all" onClick={() => {
                dispatch(addItem(item));
            }}
            >
                +
            </button>
        </div>
    )
}

export default ItemQuantity;