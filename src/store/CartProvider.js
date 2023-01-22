import CartContext from "./cart-context";
import {react, useReducer} from 'react'
const DefaultValue = {
    items:[],
    totalAmount:0,
}

const cartReducer = function(state, action) {
    if (action.type === 'ADD') {
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;

        // check if item already in cart
        const existingItem = state.items.find((item) => item.id === action.item.id);
        
        // create new items array
        const updatedItems = state.items.map((item) => {
            if (item.id === action.item.id) {
                return { ...item, amount: item.amount + action.item.amount };
            }
            return item;
        });
        
        // if item not already in cart, add to cart
        if (!existingItem) {
            updatedItems.push(action.item);
        }


        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };
    }
    if(action.type === 'remove'){
        const exsistingCartItemIndex = state.items.findIndex(item => item.id ===action.id )
        const exsistingItem = state.items[exsistingCartItemIndex]
        // const existingItem = state.items.find((item) => item.id === action.id);
        // console.log(exsistingItem,existingItem)
        let updatedItems;
        if(exsistingItem.amount === 1){
            updatedItems = state.items.filter(item => item.id !== action.id)
        }else{
            const updatedItem = {...exsistingItem, amount:exsistingItem.amount -1 }
            updatedItems = [...state.items]
            updatedItems[exsistingCartItemIndex] = updatedItem;
        }
        
        
        const updatedTotalAmount = state.totalAmount - exsistingItem.price;
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };

    }
    if(action.type === 'CLEAR'){
        return DefaultValue;

    }

    return DefaultValue;
}

const CartProvider = (props) => {
    const [cartState, dispatchCart] = useReducer(cartReducer,DefaultValue)
    const addItemHendler = (item) => {
        dispatchCart({type:'ADD', item:item})
    }
    const removeItemHendler = (id) => {
        dispatchCart({type:'remove', id:id})
    }

    const clearCartHendler = ()=>{
        dispatchCart({type:'CLEAR'})
    }
    const cartContext = {
        items:cartState.items,
        totalAmount:cartState.totalAmount,

        addItem: addItemHendler,
        removeItem: removeItemHendler,
        clearCart:clearCartHendler,
    }
  return (
    <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>
  )
}

export default CartProvider