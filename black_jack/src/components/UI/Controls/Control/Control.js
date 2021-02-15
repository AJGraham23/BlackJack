import React from 'react'
import classes from './Control.module.css'

const Control = props => {
    console.log(props);
        return (
            <div className={classes.Control}>
                <button onClick={props.clicked}
                        // style={{'visibility':`${props.visibility}`}}
                        disabled={props.visibility === 'hidden' } 
                        
                >
                             {props.children}
                </button>
            </div>
        )
    
}

export default Control
