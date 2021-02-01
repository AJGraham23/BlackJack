import React, { Component, memo } from 'react'
import Deck from '../Deck/Deck'
import classes from './Player.module.css'
import * as actions from '../../../Store/Actions/index'
import { connect } from 'react-redux'

class Player extends Component {


    // const [AcesValuedOne, setAcesValuedOne] = useState(0)
    
   
  
    // shouldComponentUpdate = (nextprops,nextState) => {
    //     if(nextprops.playerCards.length !== this.props.playerCards.length)
    //         return true
    //     else
    //         return false;
    // }
    componentDidUpdate = () => {
        if(this.props.playerCardsSum > 21) {
            this.props.roundStatus('lost');
            
        }
            // props.initRound(props.budget - props.roundBid)
        // console.log('player lost');
        else if (this.props.playerCardsSum === 21)
            this.props.toStand();
            // console.log('enable stand mode');
    }

    render() {

        // debugger;
        // let sum = props.playerCardsSum;
        console.log('player');
        return (
            <div className={classes.Player}>
                
                <div className={classes.Deck}>
                    <h2>Player's hand</h2>
                    {this.props.playerCards.length?
                    <Deck
                    deckCards = {this.props.playerCards}
                    deckSum = {this.props.playerCardsSum}
                    player
                    >
                    </Deck> :'' }
                   
                    {/* {props.playerCards
                    ?<h3 className={classes.amount}>bid amount is:<br></br>{props.bidRound + '$'}</h3>
                    : ''
                } */}
                </div>
                
            </div>
        )
        
    }
}
    
const MapStateToprops = state => {
        return {
        // playRound : state.round.round,
        // bidRound : state.round.bid,
        playerCards : state.cards.playerCards,
        playerCardsSum : state.cards.playerCardsSum,

    }
}

const mapDistpatchToprops = dispatch => {
    return {
        toStand : () => dispatch(actions.stand()),
        roundStatus : (status) => dispatch(actions.roundStatus(status)),
        // updatePlayerDeckSum : (newSum,deckOwner) => dispatch(actions.changeDeckSum(newSum,deckOwner))
    }
}


export default  connect(MapStateToprops,mapDistpatchToprops)(memo(Player))