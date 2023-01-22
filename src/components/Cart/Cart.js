import React, { useState } from "react";
import classes from "./Card.module.css";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import { useContext } from "react";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout.js";
const Cart = (props) => {
  const [isCheckout, setIsChekout] = useState(false);
  const [disSubmited,setDidSubmited]= useState(false)
  const CartCtx = useContext(CartContext);
  const DummyCardDate = CartCtx.items;
  const TotalAmount = `$${CartCtx.totalAmount.toFixed(2)}`;
  const onAddCartHendler = (item) => {
    CartCtx.addItem({ ...item, amount: 1 });
  };
  const onRemoveCartHendler = (id) => {
    CartCtx.removeItem(id);
  };
  const cartItem = (
    <ul className={classes["cart-items"]}>
      {DummyCardDate.map((elem) => (
        <CartItem
          key={elem.id}
          id={elem.id}
          name={elem.name}
          amount={elem.amount}
          price={elem.price}
          onRemove={onRemoveCartHendler.bind(null, elem.id)}
          onAdd={onAddCartHendler.bind(null, elem)}
        />
      ))}
    </ul>
  );

  const submitUserData = async (userData) => {
    try {
      await fetch(
        "https://react-learn-3d4e2-default-rtdb.firebaseio.com/orders.json",
        {
          method: "post",
          body: JSON.stringify({
            user: userData,
            orderItems: CartCtx.items,
          }),
        }
      );
      setDidSubmited(true)
      CartCtx.clearCart()
    } catch (error) {
      console.log(error);
    }
  };

  const orderSubmitHendler = () => {
    setIsChekout(true);
  };
  const chekoutAction = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onCloseModal}>
        Close
      </button>
      <button onClick={orderSubmitHendler} className={classes.button}>
        Order
      </button>
    </div>
  );

  const cartModalContent = (
    <React.Fragment>
      {cartItem}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{TotalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={submitUserData} onCancel={props.onCloseModal} />
      )}
      {!isCheckout && chekoutAction}
    </React.Fragment>
  );

  const   didSibmitmodalContent = <p>succesfully sent the Order</p>
  return <Modal onCloseModal={props.onCloseModal}>
    {!disSubmited && cartModalContent}
    {disSubmited && didSibmitmodalContent}
  </Modal>;
};

export default Cart;
