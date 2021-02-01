import React from 'react'
import classes from './Chips.module.css';
import {connect} from 'react-redux'

function Chips(props) {
    return (
        <div className={classes.Chips}>
            bid amount:
            <p>
                 {props.roundBid}    
            </p>
        </div>
    )
}

const MapStateToProps = state => {
    return {
        roundBid:state.round.bid
    }
}

export default connect(MapStateToProps)(Chips)
