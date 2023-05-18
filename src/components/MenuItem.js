import { IMG_CDN_URL } from "../constants";
import { addItem, removeItem } from "../utils/cartSlice";
import { useDispatch, useSelector } from 'react-redux';
import { useState } from "react";

const MenuItem = ({item}) => {
    const {id, name, description, price, imageId} = item;

    const dispatch = useDispatch();
    const [itemCount, setItemCount] = useState(0);
    

    const handleAddItem = (item) => {
        dispatch(addItem(item));  //redux send action object to store {payload : item}
        setItemCount(itemCount + 1);
    }

    const handleRemoveItem = (id) => {
        let updateCount;
        dispatch(removeItem(id));
        updateCount = itemCount > 0 ? itemCount - 1 : 0;
        setItemCount(updateCount);
    };

    return (
        <div className="flex justify-between p-5 border-b border-gray" key={id}>
            <div className="flex flex-col basis-[400px]">
                <h3 className="font-bold text-lg w-3" />
           <h3/>
           <p className="mt-1 text-base font-normal">
            {price > 0 ? "₹ " + item.price /100 : " "} {" "}
           </p>
           <p className="mt-3 5 leading-5 text-gray-desc w-4/5 text-base overflow-hidden">
            {description}
           </p>
            </div>
            <div className="flex flex-col justify-center items-center w-[118px] h-[150px]">
                {imageId && (
                    <img src={IMG_CDN_URL + imageId} alt={item?.name} />
                )}
                <div className="flex justify-evenly items-center mt-2 5 text-gray-count outline-none border bg-white border-gray">
                    <button className="text-xl text-gray-count font-semibold" onClick={() => handleAddItem(item)}>
                        {" "} + {" "}
                    </button>
                </div>
            </div>
        </div>    )
}

export default MenuItem;