
import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const Checkout = props => {


    const [formInputValidity, setFormInputValidity] = useState({
        name: true,
        street: true,
        city: true,
        postalCode: true
    });


    const isEmpty = value => value === '';
    const isFiveChars = value => value.trim().length === 5;


    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalInputRef = useRef();
    const cityInputRef = useRef();

    const onConfirmHandler = (event) => {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostal = postalInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredCityIsValid = !isEmpty(enteredCity);
        const enteredPostalIsValid = isFiveChars(enteredPostal);


        setFormInputValidity({
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            city: enteredCityIsValid,
            postalCode: enteredPostalIsValid
        })

        const formIsValid = enteredNameIsValid && enteredCityIsValid && enteredPostalIsValid && enteredStreetIsValid;

        if (!formIsValid) {
            return
        }
        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            city: enteredCity,
            postalCode: enteredPostal   
            
        })
    };

    const nameControlClass = `${classes.control} ${formInputValidity.name ? `` : classes.invalid}`;
    const StreetControlClass = `${classes.control} ${formInputValidity.street ? `` : classes.invalid}`;
    const postalControlClass = `${classes.control} ${formInputValidity.postalCode ? `` : classes.invalid}`;
    const cityControlClass = `${classes.control} ${formInputValidity.city ? `` : classes.invalid}`;

    return (
        <form className={classes.form} onSubmit={onConfirmHandler}>
            <div className={nameControlClass}>
                <label htmlFor="name">Your Name</label>
                <input id="name" type="text" ref={nameInputRef} />
                {!formInputValidity.name && <p>Please enter a valid name</p>}
            </div>
            <div className={StreetControlClass}>
                <label htmlFor="street">Street</label>
                <input id="street" type="text" ref={streetInputRef} />
                {!formInputValidity.street && <p>Please enter a valid street</p>}
            </div>
            <div className={postalControlClass}>
                <label htmlFor="postal">Postal Code</label>
                <input id="postal" type="text" ref={postalInputRef} />
                {!formInputValidity.postalCode && <p>Please enter a valid postal</p>}
            </div>
            <div className={cityControlClass}>
                <label htmlFor="city">City</label>
                <input id="city" type="text" ref={cityInputRef} />
                {!formInputValidity.city && <p>Please enter a valid city</p>}
            </div>
            <div className={classes.actions}>
                <button type="button" onClick={props.onCancel}>Cancel</button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    )
}


export default Checkout;