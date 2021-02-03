import React, { Component } from 'react'
import {connect} from 'react-redux'
import Deck from '../Deck/Deck'
import classes from './Dealer.module.css'
import * as actions from '../../../Store/Actions/index'

export class Dealer extends Component {


    // state = {
    //     cards:[],
    //     sum:0,
    //     round:this.props.round
    // }
    checkIfallPlayersDeckAreDone = (standArray) => {
        for (const stand of standArray) {
            if(!stand)
                return false
        }

        return true
    }
  
    componentDidUpdate = () => {
        // debugger;
        if(this.checkIfallPlayersDeckAreDone(this.props.stand))
        {
            switch (true) {
                case this.props.dealerCardsSum > 21:
                    console.log('dealer lost (cards > 21)')
                    this.props.changeRoundStatus('win')
                    break;
                // case this.props.dealerCardsSum === 21:
                //     // game.js will handle it...
                //     break;
                case this.props.dealerCardsSum < 17 :
                        console.log('add new card to the dealer')
                        this.props.addCardtoDealer();
                    //  add another card to the dealer
                    break;

                default:
                    this.props.changeRoundStatus('decision');
                    break;
            }
        }
    }

    render() {
        return (
            <div className={classes.Dealer}>
                <div className={classes.Deck}>
                <h2>Diller's hand</h2>
                {this.props.dealerCardsSum ?
                    <Deck
                        // HideDealerCard 
                        toHide={true}
                        deckCards = {this.props.dealerDeck}
                        deckSum = {this.props.dealerCardsSum}
                    >
                    </Deck> :''}
                </div>
            </div>
        )
    }
}



const MapStateToProps = state => {
    return {
        dealerDeck : state.cards.dealerCards,
        // roundStatus : state.round.roundStatus,
        stand : state.round.stand,
        dealerCardsSum:state.cards.dealerCardsSum

        
    }
}

const mapDistpatchToProps = dispatch => {
    return {
        startRound : () => dispatch(actions.startRound()),
        generateStartCards : () => dispatch(actions.devideCardForRoundStart()),
        changeRoundStatus : (status) => dispatch(actions.roundStatus(status)),
        addCardtoDealer : () => dispatch(actions.addCard('dealer'))
    }
}

export default connect(MapStateToProps,mapDistpatchToProps)(Dealer)
