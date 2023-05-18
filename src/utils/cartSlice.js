import { createSlice } from "@reduxjs/toolkit"

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: {},
        totalItemsCount: 0,
        deliveryAddress: {},
        paymentMethod: {},
    },

    //to modify our cartSlice we will create reducer function
    reducers: {
        //reducer function will be called on dispatch of action here addItem is an action and corresponding value to addItem key is reducer function which will be called on dispatch of addItem action. 
        addItem: (state, action) => {
            //state.items.push(action.payload);

            const item = state.items[action.payload.id]
            const quantity = item && item.hasOwnProperty("quantity") ? state.items[action.payload.id]?.quantity + 1 : 1;
            state.items[action.payload.id] = { ...action.payload, quantity };
            state.totalItemsCount = state.totalItemsCount + 1;
        },

        removeItem: (state, action) => {
            //state.items.pop();
            const item = state.items[action.payload];
            if (!item) return;
            if (item.quantity > 1) {
                item.quantity -= 1;
                state.totalItemsCount--;
            } else {
                state.totalItemsCount--;
                delete state.items[action.payload];
            }
        },
        clearCart: (state) => {
            state.items = [];
            state.totalItemsCount = 0;
        },
        updateDeliveryAddress: (state, action) => {
            state.deliveryAddress = action.payload;
        },
        updatePaymentMethod: (state, action) => {
            state.paymentMethod = action.payload;
        }
    },
});


export const { addItem, removeItem, clearCart, updateDeliveryAddress, updatePaymentMethod } = cartSlice.actions;

export default cartSlice.reducer;  //this will combine all the reducers and return as one reducer



//  Behind the scenes cartSlice is an object we know it and it might look like this
// cartSlice = {
//     actions :{
//         addItem,
//         removeItem,
//         clearCart
//     },
//     reducer: reducers
// }















/* created a store using createStore() API an we imported that from configure store we imported that from RTK 

 NEXT provide my store to App using Provider Component <Provider store = {store}> we imported provider from react-redux

next created a slice using API createSlice() -this api will come from redux-tool-kit

slice
RTK -createSlice({
    name: "",
    initalState:
    reducers: {
        addItem: (state,action) => {state = action.payload}
    }
})

export const {addItem, removeItem} = cartSlice.actions;
export default cartSlice.reducer;

put that slice into store 
  -{
    reducer: {
        every slice wil have their own reducer and all these reducers will go here.
        
        cart: cartSlice,
        user: userSlice
    }
  }

*/