import CartContext from "./cart-context"
import { useReducer } from "react"

const defaultCartState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state, action) => {
    if (action.type === 'ADD') {
        const updatedItem = state.items.concat(action.data);
        const updatedTotalItem = state.totalAmount + (action.data.price * action.data.amount)
        return {
            items: updatedItem,
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