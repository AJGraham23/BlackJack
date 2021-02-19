import React from 'react'
import classes from './Control.module.css'

const Control = props => {

    let disabledClass = props.visibility === 'hidden' ? ' shutDown' :'';
        return (
            <div className={classes.Control + ' ' + (props.visibility === 'hidden' ? classes.shutDown :'') }>
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
