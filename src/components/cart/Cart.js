import classes from './Cart.module.css'
import Modal from '../ui/Modal'
import { useContext, useState } from 'react';
import CartContext from '../../store/cart-context'
import CartItem from './CartItem'
import Checkout from './Checkout'
import { Fragment } from 'react'

const Cart = (props) => {

    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [didSubmit, setDidSubmit] = useState(false);
    const cartCtx = useContext(CartContext)
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`
    const hasItems = cartCtx.items.length > 0

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id)
    }
    const cartItemAddHandler = (item) => {
        cartCtx.addItem(item)
    }

    const cartItems = <ul className={classes['cart-items']}>
        {cartCtx.items.map(item => (
            <CartItem key={item.id} name={item.name} amount={item.amount} price={item.price} onRemove={cartItemRemoveHandler.bind(null, item.id)} onAdd={cartItemAddHandler.bind(null, item)} />
        ))}
    </ul>

    const orderHandler = () => {
        setIsCheckout(true)
    }

    const submitOrderHandler = async (userData) => {
        setIsSubmitting(true)
        const response = await fetch('https://react-demo-58101-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderdItems: cartCtx.items
            })
        });
        if (response.ok) {
            console.log("Passed")
            setDidSubmit(true)
            setIsSubmitting(false)
            cartCtx.clearCart()
        } else {
            console.log("Err: ", response.statusText)
            setDidSubmit(true)
            setIsSubmitting(true)
        }
    }

    const modalActions = isCheckout ?
        (
            <Checkout onCancel={props.onClose} onConfirm={submitOrderHandler} />
        ) :
        (
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
                {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
            </div>
        )

    const cardModalContent = (
        <Fragment>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {modalActions}
        </Fragment>
    )

    const isSubmittingModalContent = <h3>Sending order data...</h3>

    const didSubmitModalConent = (
        <Fragment>
            <h3>Successfully sent the order!</h3>
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
            </div>
        </Fragment>
    )

    const submitErrorModalContent = (
        <Fragment>
            <h3>Could not send your order!</h3>
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
            </div>
        </Fragment>
    )

    return (
        <Modal onClose={props.onClose}>
            {!isSubmitting && !didSubmit && cardModalContent}
            {isSubmitting && !didSubmit && isSubmittingModalContent}
            {!isSubmitting && didSubmit && didSubmitModalConent}
            {isSubmitting && didSubmit && submitErrorModalContent}
        </Modal>
    );
};

export default Cart;