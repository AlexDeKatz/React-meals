import CartIcon from "../cart/CartIcon";
import classes from './HeaderCardButton.module.css';

import { useContext, useEffect, useState } from 'react'
import CartContext from '../../store/cart-context';

const HeaderCardButton = (props) => {
    const [btnIsHighligted, setBtnIsHighlighted] = useState(false)
    const cartCtx = useContext(CartContext);
    const cartItemCount = cartCtx.items.reduce((curNumber, item) => {
        return curNumber + item.amount
    }, 0)

    const btnClasses = `${classes.button} ${btnIsHighligted ? classes.bump : ''}`

    useEffect(() => {
        if (cartCtx.items.length === 0) {
            return
        }
        setBtnIsHighlighted(true)
        const timer = setTimeout(() => { setBtnIsHighlighted(false) }, 300);
        return () => { clearTimeout(timer) }
    }, [cartCtx.items])
    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>
                {cartItemCount}
            </span>
        </button>
    )
};

export default HeaderCardButton;