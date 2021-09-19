import classes from './MealItemForm.module.css';
import Input from '../../ui/Input'

const MealItemForm = (props) => {
    const inputConfig = { id: `amount_${props.id}`, type: 'number', min: '1', step: '1', max: '5', defaultValue: '1' }
    return (
        <form className={classes.form}>
            <Input label="Qty" input={inputConfig} />
            <button>+ Add</button>
        </form>
    );
};

export default MealItemForm;