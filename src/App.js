import { useState,} from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";

import CartProvider from "./store/CartProvider";
function App() {
  const [cartIsVisible,setCartIsVisible] = useState(false)

  const showCartHendler = ()=>{
    setCartIsVisible(true)
  }
  
  const hideCartHendler = ()=>{
    setCartIsVisible(false)
  }

  return (
    <CartProvider>
            {cartIsVisible && <Cart onCloseModal={hideCartHendler} />} 
      <Header onshowCart={showCartHendler}/>
      <main>
      <Meals/>
      </main>
    </CartProvider>
  );
}

export default App;
