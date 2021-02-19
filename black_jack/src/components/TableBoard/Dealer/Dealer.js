import React, { Component , memo } from 'react'
import {connect} from 'react-redux'
import Deck from '../Deck/Deck'
import classes from './Dealer.module.css'
import * as actions from '../../../Store/Actions/index'

export class Dealer extends Component {


    state = {
        numOfRequestForCard:0
    }
    checkIfallPlayersDeckAreDone = (standArray) => {
        for (const stand of standArray) {
            if(!stand)
                return false
        }
        return true
    }

   
   
    shouldComponentUpdate = (nextProps,nextState) => {
        if(!nextProps.dealerDeck.length)
            return true
        if(nextProps.dealerDeck.length - nextState.numOfRequestForCard === 2)
        {
           return true
        }
        return false;
    }

    componentDidUpdate = () => {
        if(
             this.checkIfallPlayersDeckAreDone(this.props.handsResult)
         )
        {
            switch (true) {
                case this.props.dealerCardsSum > 21:
                    console.log('dealer lost (cards > 21)')
                    this.props.dealerBust();
                    this.setState({
                        numOfRequestForCard:0
                    });
                 
                    break;
                case this.props.dealerCardsSum < 17 :
                        //  add another card to the dealer
                        if(this.props.dealerDeck.length - this.state.numOfRequestForCard === 2)
                        {
                            this.props.addCardtoDealer();
                            this.setState({
                                numOfRequestForCard:this.state.numOfRequestForCard + 1
                            });
                        }
                    break;
                        
                default:
                           
                            this.props.changeRoundStatus('decision');
                            if(this.state.numOfRequestForCard)     
                                this.setState({
                                    numOfRequestForCard:0
                                });   
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
        dealerCardsSum:state.cards.dealerCardsSum,
        

        
    }
}

const mapDistpatchToProps = dispatch => {
    return {

        changeRoundStatus : (status) => dispatch(actions.roundStatus(status)),
        addCardtoDealer : () => dispatch(actions.addCard('dealer')),
        dealerBust : () => dispatch(actions.dealerBust()),
       
 
    }
}

export default connect(MapStateToProps,mapDistpatchToProps)(memo(Dealer))
