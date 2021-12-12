import classes from './Checkout.module.css';
import useInput from '../../hooks/use-input'

const isEmptyCheck = (value) => value.trim() !== '';
const isSixCharCheck = (value) => value.trim().length === 6;


const Checkout = (props) => {

    const { value: enteredName, hasError: nameInputError, isValid: nameIsValid, valueChangeHandler: nameChangeHandler, inputBlurHandler: nameBlurHandler, reset: resetNameInput } = useInput(isEmptyCheck)

    const { value: enteredStreet, hasError: streetInputError, isValid: streetIsValid, valueChangeHandler: streetChangeHandler, inputBlurHandler: streetBlurHandler, reset: resetStreetInput } = useInput(isEmptyCheck)

    const { value: enteredCity, hasError: cityInputError, isValid: citytIsValid, valueChangeHandler: cityChangeHandler, inputBlurHandler: cityBlurHandler, reset: resetCitytInput } = useInput(isEmptyCheck)

    const { value: enteredPostal, hasError: postalInputError, isValid: postalIsValid, valueChangeHandler: postalChangeHandler, inputBlurHandler: postalBlurHandler, reset: resetPostaltInput } = useInput(isSixCharCheck)

    const nameInputClass = nameInputError ? `${classes.control} ${classes.invalid}` : `${classes.control}`
    const streetInputClass = streetInputError ? `${classes.control} ${classes.invalid}` : `${classes.control}`
    const cityInputClass = cityInputError ? `${classes.control} ${classes.invalid}` : `${classes.control}`
    const postalInputClass = postalInputError ? `${classes.control} ${classes.invalid}` : `${classes.control}`

    let formIsValid = false

    if (nameIsValid && streetIsValid && citytIsValid && postalIsValid) {
        formIsValid = true
    }

    const confirmHandler = (event) => {
        event.preventDefault();
        if (!formIsValid) {
            return
        }
        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            city: enteredCity,
            postalCode: enteredPostal
        });
        resetNameInput()
        resetStreetInput()
        resetCitytInput()
        resetPostaltInput()
    };

    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={nameInputClass}>
                <label htmlFor='name'>Your Name</label>
                <input type='text' id='name' onChange={nameChangeHandler} value={enteredName} onBlur={nameBlurHandler} />
                {nameInputError && <p className={classes['error-text']}>Name must not be empty</p>}
            </div>
            <div className={streetInputClass}>
                <label htmlFor='street'>Street</label>
                <input type='text' id='street' onChange={streetChangeHandler} value={enteredStreet} onBlur={streetBlurHandler} />
                {streetInputError && <p className={classes['error-text']}>Street must not be empty</p>}
            </div>
            <div className={cityInputClass}>
                <label htmlFor='city'>City</label>
                <input type='text' id='city' onChange={cityChangeHandler} value={enteredCity} onBlur={cityBlurHandler} />
                {cityInputError && <p className={classes['error-text']}>City must not be empty</p>}
            </div>
            <div className={postalInputClass}>
                <label htmlFor='postal'>Postal Code</label>
                <input type='text' id='postal' onChange={postalChangeHandler} value={enteredPostal} onBlur={postalBlurHandler} />
                {postalInputError && <p className={classes['error-text']}>Postal code must be of 6 digits</p>}
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={props.onCancel}>
                    Cancel
                </button>
                <button type='submit' className={classes.submit} disabled={!formIsValid}>Confirm</button>
            </div>
        </form>
    );
};

export default Checkout;