import classes from './MealItemForm.module.css';
import Input from '../../ui/Input'
import { useRef, useState } from 'react';

const MealItemForm = (props) => {
    const [amtIsValid, setAmtValid] = useState(true)
    const amountInputRef = useRef();

    const submitHandler = (event) => {
        event.preventDefault()
        const enteredAmt = amountInputRef.current.value
        // const enteredAmtNumber = +enteredAmt
        if (enteredAmt.trim().length === 0 || +enteredAmt < 1 || +enteredAmt > 5) {
            setAmtValid(false)
            return;
        }
        props.onAddToCart(+enteredAmt);
    }

    const inputConfig = { id: `amount_${props.id}`, type: 'number', min: '1', step: '1', max: '5', defaultValue: '1' }
    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <Input label="Qty" input={inputConfig} ref={amountInputRef} />
            <button>+ Add</button>
            {!amtIsValid && <p>Please enter a valid amount (1-5)</p>}
        </form>
    );
};

export default MealItemForm;