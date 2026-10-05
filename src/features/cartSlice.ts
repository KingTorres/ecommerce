import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ProductProp {
    id: number,
    title: string,
    price: number,
    thumbnail: string
}

interface CartItem {
    id: number,
    title: string,
    price: number,
    thumbnail: string,
    quantity: number
}
interface CartState {
    productItems: CartItem[]
}
const initialState: CartState = {
    productItems: []
}

const productSlice = createSlice({
    name: "productItems",
    initialState,
    reducers: {
        addProductItem: (state, action: PayloadAction<ProductProp>) => {
            const existingItem = state.productItems.find((item) => item.id === action.payload.id)
            if(existingItem) {
                existingItem.quantity += 1;
            } else {
                state.productItems.push({
                    id: action.payload.id,
                    title: action.payload.title,
                    price: action.payload.price,
                    thumbnail: action.payload.thumbnail,
                    quantity: 1
                })
            }
        },
        removeProductItem: (state, action: PayloadAction<number>) => {
            state.productItems = state.productItems.filter((item) => item.id !== action.payload)
        },
        decreaseQuantity: (state, action: PayloadAction<number>) => {
            const existingItem = state.productItems.find((item) => item.id === action.payload)
            if(existingItem) {
                if(existingItem.quantity > 1) {
                    existingItem.quantity -= 1
                } else {
                    state.productItems = state.productItems.filter((item) => item.id !== action.payload)
                }
            }
        }
    }
})

export const {addProductItem, removeProductItem, decreaseQuantity} = productSlice.actions
export default productSlice.reducer