import React from 'react'
import classes from './Modal.module.css'
import  ReactDOM  from 'react-dom'
const Backdrop = (props) => {
 return (<div className={classes.backdrop} onClick={props.onCloseModal}></div>)
}

const ModalOverlay = props => {
    return (<div className={classes.modal}>
        <div className={classes.content}>{props.children}</div>
    </div>)
   }
const Modal = (props) => {
    const portalEl = document.getElementById('modal')
  return (
    <React.Fragment>
        {ReactDOM.createPortal(<Backdrop onCloseModal={props.onCloseModal}/>,portalEl)}
        {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>,portalEl)}
    </React.Fragment>
  )
}

export default Modal