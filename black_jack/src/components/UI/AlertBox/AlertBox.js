import React, { Component } from 'react'
import { connect } from 'react-redux'
import classes from './AlertBox.module.css'


export class AlertBox extends Component {
    render() {
        return (
            <div className={classes.Result}>
                <p>you won!</p>
            </div>
        )
    }
}


const MapStateToProps = state => {
    return {
    //     //   playerCards:state.cards.playerCards,
    //     //   stand:state.round.stand,
    //     //   budget:state.game.budget,
    //     //   allStand:state.round.stand.find(el=> el === false),
    //   dealerCards:state.cards.dealerCards,
    //   roundStatus:state.round.roundStatus,
    //   roundBids:state.round.bid,
    //   dealerSum:state.cards.dealerCardsSum,
    //   playerSum:state.cards.playerCardsSum,
    //   roundStarted:state.round.round,
    //   dealerBust:state.round.dealerBust,
    //   insurance:state.round.insurance,
    //   next:state.round.next

    }
}

const mapDistpatchToProps = dispatch => {
    return {
        // startGame : () => dispatch(actions.startGame()),
        // changeRoundStatus : (status) => dispatch(actions.roundStatus(status)),
        // // hitOneMoreCard : (newBudget) => dispatch(actions.initRound(newBudget)),
        // initRound : (totalProfit) => dispatch(actions.initRound(totalProfit)),
        // devideStartingCards : () => dispatch(actions.devideCardForRoundStart()),
        // collectInsurance : (insuranceAmount) => dispatch(actions.collectInsurance(insuranceAmount)),
        // // collectProfit : (profit) => dispatch(actions.collectProfits(profit)),
        // collectProfitAndInitBid : (profit,bidIndex) => dispatch(actions.collectProfitAndInitBid(profit,bidIndex)),
        // removeDeck : (deckNumber) => dispatch(actions.removeDeck(deckNumber)),
        // changeNextValue : (nextState) => dispatch(actions.changeNextValue(nextState))
        
    }
}

export default connect(MapStateToProps,mapDistpatchToProps)(AlertBox)
