import React from 'react'
import classes from './Control.module.css'

const Control = props => {
   
        return (
            <div className={classes.Control}>
                <button onClick={props.clicked}
                        style={{'visibility':`${props.visibility}`}}
                        disabled={!props.visibility}
                >
                             {props.children}
                </button>
            </div>
        )
    
}

export default Control
