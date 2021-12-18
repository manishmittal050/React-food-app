import { useContext,useEffect,useState } from "react";
import CartContext from "../../store/cart-context";
import classes from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";

const  HeaderCartButton = props=>{
    const [btnHigh,setBtnhigh] = useState(false);

    const crtCtx = useContext(CartContext);
    const {items} = crtCtx;

    const numberOfCartItems = items.reduce((curNum, item)=>{
        return curNum+item.amount;
    },0);


    const btnClasses = `${classes.button} ${btnHigh ? classes.bump : ''}`;

    useEffect(()=>{
        if(items.length === 0) return;

        setBtnhigh(true);

        const timer = setTimeout(()=>{
            setBtnhigh(false);
        },300)

        return ()=>{
            clearTimeout(timer);
        }
    },[items])

    return(
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    )

}

export default HeaderCartButton