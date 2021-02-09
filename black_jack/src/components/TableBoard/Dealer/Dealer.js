import React, { Component , memo } from 'react'
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

    // didPlayerFinish = (handsResults) => {
    //     for (let index = 0; index < handsResults.length; index++) {
    //         if(handsResults[index] === '')
    //             return false
    //     }

    //     return true
    // }
    // let x = this.didPlayerFinish(this.props.handsResult);
  
    componentDidUpdate = () => {
        // debugger;
        if(this.checkIfallPlayersDeckAreDone(this.props.stand)
         || this.checkIfallPlayersDeckAreDone(this.props.handsResult))
        {
            switch (true) {
                case this.props.dealerCardsSum > 21:
                    console.log('dealer lost (cards > 21)')
                    // this.props.changeRoundStatus('win')
                    let lengthOfhandsResults = this.props.handsResult.length;
                    if(this.props.handsResult[lengthOfhandsResults] !== 'lost')
                    {// this.props.changeHandResult('win');
                        this.props.dealerBust();
                        // this.props.changeRoundStatus('decision');
                    }
                    break;
                case this.props.dealerCardsSum < 17 :
                        //  add another card to the dealer
                        this.props.addCardtoDealer();
                    break;
                        
                default:
                            // if(this.props.handsResult[this.props.split] !== 'decision')
                            //     this.props.changeHandResult('decision');
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
        handsResult : state.round.handsResult,
        stand : state.round.stand,
        split : state.round.split,
        dealerCardsSum:state.cards.dealerCardsSum,
        

        
    }
}

const mapDistpatchToProps = dispatch => {
    return {
        startRound : () => dispatch(actions.startRound()),
        generateStartCards : () => dispatch(actions.devideCardForRoundStart()),
        changeRoundStatus : (status) => dispatch(actions.roundStatus(status)),
        addCardtoDealer : () => dispatch(actions.addCard('dealer')),
        dealerBust : () => dispatch(actions.dealerBust()),
        changeHandResult : (result) => dispatch(actions.changeHandResult(result)),
        // changeRoundStatus : () => dispatch(actions.changeRoundStatus('decision'))
 
    }
}

export default connect(MapStateToProps,mapDistpatchToProps)(memo(Dealer))
