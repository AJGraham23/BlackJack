import React, { Component , memo } from 'react'
import {connect} from 'react-redux'
import Deck from '../Deck/Deck'
import classes from './Dealer.module.css'
import * as actions from '../../../Store/Actions/index'

export class Dealer extends Component {


    state = {
        numOfRequestForCard:0,
        showCard:true
    }
    checkIfallPlayersDeckAreDone = (standArray) => {
        for (const stand of standArray) {
            if(!stand)
                return false
        }
        return true;
    }

    DidPlayerFinished = () => {
        if(this.props.handsResult.find(result => result === '') == '')
            return false
        else
            return true;
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
                    this.props.changeRoundStatus('decision');
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
                        
                // case this.props.dealerCardsSum == 21:
                default:
                            if(this.props.roundStatus == 'pending')                           
                                this.props.changeRoundStatus('decision');
                            if(this.state.numOfRequestForCard)     
                                this.setState({
                                    numOfRequestForCard:0
                                });   
                    break;
            }
        }
        // debugger;
        if(this.DidPlayerFinished() && !this.state.showCard && this.props.dealerDeck.length == 2) 
            this.setState({showCard:true})
        
        else if(!this.props.dealerDeck.length && this.state.showCard)
            this.setState({showCard:false})

    }


    render() {
        return (
            <div className={classes.Dealer}>
                <div className={classes.Deck}>
                <h2>Diller's hand</h2>
                {this.props.dealerCardsSum ?
                    <Deck
                        HideDealerCard ={!this.state.showCard}
                        toHide={true}
                        deckCards = {this.props.dealerDeck}
                        deckSum = {this.props.dealerCardsSum}
                        dealer
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
        roundStatus:state.round.roundStatus
        

        
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
