import React, { useContext, useState } from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";

const Cart = props => {

    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);
    const cartCtx = useContext(CartContext)

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;


    const orderHandler = () => {
        setIsCheckout(true)

    };


    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id);
    }

    const cartItemAddHandler = item => {
        cartCtx.addItem({ ...item, amount: 1 });
    }


    const submitFormHandler = async (userData) => {

        setIsSubmitting(true);

        await fetch('https://react-http-efe63-default-rtdb.asia-southeast1.firebasedatabase.app/order.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItem: cartCtx.items
            })
        });

        setIsSubmitting(false);
        setDidSubmit(true)

        cartCtx.clearCart();
    }


    const modalActions = (
        <div className={classes.actions}>
            {!isCheckout && <button className={classes['button--alt']} onClick={props.onHideCart}>Close</button>}
            {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
        </div>
    )


    const cartItems = (<ul className={classes['cart-items']}>{
        cartCtx.items.map((item) =>
            <CartItem
                key={item.id}
                name={item.name}
                amount={item.amount}
                price={item.price}
                onRemove={cartItemRemoveHandler.bind(null, item.id)}
                onAdd={cartItemAddHandler.bind(null, item)}>
                {item.name}
            </CartItem>)}</ul>);



    const cartModalContent = (
        <React.Fragment>
            {cartItems}
            <div className={classes.total}>
                <span>Total amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout && <Checkout
                onConfirm={submitFormHandler}
                onCancel={props.onHideCart} />}
            {!isCheckout && modalActions}
        </React.Fragment>
    )


    const isSubmittingModalContent = <p>Sending order data...</p>;

    const didSubmitModal = (<React.Fragment>
        <p>Successfully saved order!!</p>
        <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.onHideCart}>Close</button>
        </div>
    </React.Fragment>);



    return (
        <Modal onClose={props.onHideCart}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && isSubmittingModalContent}
            {!isSubmitting && didSubmit && didSubmitModal}
        </Modal>
    );
}

export default Cart;