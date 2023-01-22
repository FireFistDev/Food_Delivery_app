import React from "react";
import Input from "../../UI/Input";
import classes from "./MealItem.module.css";
import { useRef, useContext } from "react";
import CartContext from "../../../store/cart-context";
const MealItem = (props) => {
  const formRef = useRef()
  const ctxItem = useContext(CartContext)
  const PRICE = `$${props.price}`;

  const addCartHendler = function(amount){

    ctxItem.addItem({
      id:props.id,
      name:props.name,
      amount:amount,
      price:props.price

    })

  }

  const formSubmitHendler = (e)=>{
    e.preventDefault()
    const enteredAmount = +formRef.current[0].value
    addCartHendler(enteredAmount)
  }
  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{PRICE}</div>
      </div>
      <div>
        <form ref={formRef} onSubmit={formSubmitHendler} className={classes.form}>
          <Input input={{id:props.id, type:'number', min:'1', max:'5', defaultValue:'1'}}/>
          <button type=" submit">+add</button>
        </form>
      </div>
    </li>
  );
};

export default MealItem;
