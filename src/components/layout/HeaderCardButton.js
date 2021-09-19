import CartIcon from "../cart/CartIcon";
import classes from './HeaderCardButton.module.css';

const HeaderCardButton = (props) => {
    return (
        <button className={classes.button}>
            <span className={classes.icon}>
                <CartIcon/>
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>
                3 {/* Total number of items */}
            </span>
        </button>
    )
};

export default HeaderCardButton;