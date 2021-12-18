import { useReducer } from 'react';
import CartContext from './cart-context';


const defaultCartState = {
    items: [],
    totalAmount: 0
}


const cartReducer = (state, action) => {

    if (action.type === 'ADD') {
        const updateAmount = state.totalAmount + action.item.price * action.item.amount;
        const existingCartItemIndex = state.items.findIndex((item) => item.id === action.item.id);
        const existingItem = state.items[existingCartItemIndex];

        let updateItems;
        if (existingItem) {
            const updatedItem = {
                ...existingItem,
                amount: existingItem.amount + action.item.amount
            };
            updateItems = [...state.items];
            updateItems[existingCartItemIndex] = updatedItem;
        }
        else {
            updateItems = state.items.concat(action.item);
        }

        return {
            items: updateItems,
            totalAmount: updateAmount
        }
    }

    if(action.type==='REMOVE'){
        const existingCartItemIndex = state.items.findIndex((item)=> item.id === action.id);
        const existingItem = state.items[existingCartItemIndex];
        const updateTotalAmount = state.totalAmount - existingItem.price;
        let updatedItems;
        if(existingItem.amount === 1){
            updatedItems = state.items.filter(item=> item.id !== action.id)
        }else{
            const updatedItem = {...existingItem,amount:existingItem.amount - 1};
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex]=updatedItem;
        }

        return {
            items: updatedItems,
            totalAmount: updateTotalAmount
        }
    }

    if(action.type==='CLEAR'){
        return defaultCartState;
    }

    return defaultCartState;

}

const CartProvider = props => {

    const [cartState, dispacherCartAddState] = useReducer(cartReducer, defaultCartState);

    const addItemToCartHandler = item => {
        dispacherCartAddState({ type: 'ADD', item: item })
    }
    const removeItemFromCartHandler = id => {
        dispacherCartAddState({ type: 'REMOVE', id: id })
    }

    const clearCarthandler = () => {
        dispacherCartAddState({type: 'CLEAR'})
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        clearCart: clearCarthandler
    }

    return (<CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>)
};

export default CartProvider;