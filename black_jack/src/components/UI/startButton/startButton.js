import React from 'react'
import classes from './startButton.module.css'

const StartButton = (props) => {
    return (
        <div className={classes.startButton}>
            {/* <button
            onClick={props.click}
            >{props.children}
            </button> */}
            <a href="#" onClick={props.clicked} className={classes.btn + ' ' + classes.btnAnimate
        + ' ' + classes.btnWhite}>{props.children}</a>
        </div>
    )
}
// "btn btn-white btn-animate"
export default StartButton
