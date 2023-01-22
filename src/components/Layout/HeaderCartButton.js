import React from "react";
import classes from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";
const HeaderCartButton = (props) => {
  const [btnHilight, setBtnHilight] = useState(false)
  const ctxCart = useContext(CartContext)
  const totalCartItems = ctxCart.items.reduce((curValue,item)=> (curValue + item.amount),0)

  const btn = `${classes.button} ${btnHilight ? classes.bump : ''}`

  useEffect(()=>{
    if(ctxCart.items.length === 0) return
    setBtnHilight(true)
    const timer = setTimeout(()=>{
      setBtnHilight(false)
    },300)

    return ()=> {
      clearTimeout(timer)
    }

  },[ctxCart.items])

  return (
    <button  className={btn} onClick={props.onShowCart}>
      <span className={classes.icon}><CartIcon/></span>
      <span>YourCart</span>
      <span className={classes.badge}>{totalCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
