import React from 'react'
import classes from './Chips.module.css';
import {connect} from 'react-redux'

function Chips(props) {

    const totalBids = props.roundBid.reduce((a,b)=>a+b);    
    return (
        <div className={classes.Chips}>
            bid amount:
            <p>
                 {totalBids} 
            </p>
            <p>
                 {props.insuranceBid ? '+ ' + props.roundBid[0]/2 + '(i)' : ''}    
            </p>
        </div>
    )
}

const MapStateToProps = state => {
    return {
        roundBid:state.round.bid,
        insuranceBid : state.round.insurance
    }
}



export default connect(MapStateToProps)(Chips)
