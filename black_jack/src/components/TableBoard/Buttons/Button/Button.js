import React from 'react'
import classes from './Button.module.css'


function Button(props) {
    return (
        <div className={classes.Button}>
             <button onClick={props.clicked}>{props.children}</button>
        </div>
    )
}

export default Button
