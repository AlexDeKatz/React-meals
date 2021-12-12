import { useReducer } from 'react';

const initialState = {
    value: '',
    isTouched: false
}

const inputStateReducer = (state, action) => {
    if (action.type === 'INPUT') {
        return { value: action.value, isTouched: state.isTouched }
    } else if (action.type === 'BLUR') {
        return { isTouched: true, value: state.value }
    } else {
        return { isTouched: false, value: '' }
    }
};

const useInput = (validateValue) => {
    const [inputState, dispatch] = useReducer(inputStateReducer, initialState)

    const valueIsValid = validateValue(inputState.value);
    const hasError = inputState.isTouched && !valueIsValid;

    const valueChangeHandler = event => {
        dispatch({ type: 'INPUT', value: event.target.value })
    }

    const inputBlurHandler = event => {
        dispatch({ type: 'BLUR' })
    }

    const reset = () => {
        dispatch({ type: 'RESET' })
    }

    return {
        value: inputState.value,
        hasError,
        isValid: valueIsValid,
        valueChangeHandler,
        inputBlurHandler,
        reset
    }
}

export default useInput;