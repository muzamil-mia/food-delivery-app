import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AccountFallback from "./AccountFallback"
import CartFallback from "./CartFallback";
import ItemQuantity from "./ItemQuantity";
import { Link } from "react-router-dom";
import useItemTotal from "../utils/useItemTotal";
import { clearCart } from "../utils/cartSlice";


const Cart = () => {


    const cartItems = useSelector((store) => store.cart.items);
    const dispatch = useDispatch();
    const getItemTotal = useItemTotal();

    const handleClearCart = () => {
        dispatch(clearCart());
    }

    return Object.values(cartItems).length > 0 ? (
        <div className="flex mt-5 mx-6 p-20 justify-between sm:p-0 xsm:p-0 mob:p-0 sm:flex-col xsm:flex-col mob:flex-col">
            <div className="lg:w-[60%] md:w-[60%] xl:w-[60%]">
                <AccountFallback />
            </div>

            <div className="bg-white drop-shadow-md flex-2 p-6 w-auto">
                <div className="flex justify-between items-center mb-2">
                    <h1 className="text-lg mt-2 5 text-title font-bold">Cart Items</h1>
                    <button className="w-[80px] h-[22px] rounded-md bg-red text-white text-sm" onClick={() => handleClearCart()}>Clear Cart</button>
                </div>
               {Object.values(cartItems).map((item) => {
                return (
                    <div className="my-3">
                        <div className="flex items-center mt-2">
                        <p className="px-2 w-48 text-sm">{item.name}</p>
                        <div className="px-5">
                            <ItemQuantity item={item} key={item?.id}/>
                        </div>
                        <p className="font-thin text-sm">
                        {"₹ " + (item.price / 100) * item.quantity}
                        </p>
                        </div>
                    </div>
                )
               })}

               <div className="border border-black my-2">
                <div className="flex justify-between">
                    <p className="font-bold text-sm">To Pay</p>
                    <p className="font-bold text-sm">{"₹ " + getItemTotal()}</p>
                </div>
               </div>
            </div>
        </div>) : (
        <div className="container mx-auto">
            <CartFallback
                text={"Your cart is empty ! "}
                btnText={"SEE RESTAURANTS NEAR YOU"}
            />
        </div>
    )
}
export default Cart;