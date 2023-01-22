import React from 'react'
import classes from './Header.module.css'
import image from '../../assets/meals.jpg'
import HeaderCartButton from './HeaderCartButton'
const Header = props => {
  return (
    <React.Fragment>
        <header className={classes.header}>
            <h1>Food Delivery</h1>
            <HeaderCartButton onShowCart={props.onshowCart}/>
        </header>
        <div className={classes['main-image']}>
        <img  src={image}></img>

        </div>
    </React.Fragment>
  )
}

export default Header