import CartContext from "./cart-context"
import { useReducer } from "react"

const defaultCartState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state, action) => {
    if (action.type === 'ADD') {
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.data.id)
        let existingCartItem = state.items[existingCartItemIndex]
        let updatedItems = [];
        if (!!existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + (action.data.amount)
            };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem
        } else {
            updatedItems = state.items.concat(action.data);
        }
        const updatedTotalItem = state.totalAmount + (action.data.price * action.data.amount)
        return {
            items: updatedItems,
            totalAmount: updatedTotalItem
        }
    }
    else if (action.type === 'REMOVE') {
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.data)
        let existingCartItem = state.items[existingCartItemIndex]
        let updatedItems = [];
        if (existingCartItem.amount === 1) {
            updatedItems = state.items.filter(item => item.id !== action.data)
        } else {
            const updatedItem = { ...existingCartItem, amount: existingCartItem.amount - 1 }
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem
        }
        const updatedTotalItem = state.totalAmount - existingCartItem.price
        return {
            items: updatedItems,
            totalAmount: updatedTotalItem
        }
    }
    return defaultCartState;
}

const CartProvider = (props) => {

    const [cartState, dispactCatAction] = useReducer(cartReducer, defaultCartState)

    const addItemToCartHandler = (item) => {
        dispactCatAction({ type: 'ADD', data: item })
    }

    const removeItemFromCartHandler = (id) => {
        dispactCatAction({ type: 'REMOVE', data: id })
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler
    }

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartProvider;