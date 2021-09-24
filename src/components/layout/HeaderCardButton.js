import CartIcon from "../cart/CartIcon";
import classes from './HeaderCardButton.module.css';

import { useContext } from 'react'
import CartContext from '../../store/cart-context';

const HeaderCardButton = (props) => {

    const cartCtx = useContext(CartContext);
    const cartItemCount = cartCtx.items.reduce((curNumber, item) => {
        return curNumber + item.amount
    }, 0)

    return (
        <button className={classes.button} onClick={props.onClick}>
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