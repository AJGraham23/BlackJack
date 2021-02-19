import React, { Component, memo } from 'react'
import Deck from '../Deck/Deck'
import classes from './Player.module.css'
import * as actions from '../../../Store/Actions/index'
import { connect } from 'react-redux'

class Player extends Component {


    componentDidUpdate = () => {
        if(this.props.playerCards.length)
        {
            if(this.props.playerCards[this.props.activeDeckNumber].length < 2 && this.props.roundStatus === 'pending')
            {
                    this.props.giveOneMoreCard(this.props.activeDeckNumber);
            }
        }
        // cards sum is 21 or over
        if(this.props.playerCardsSum[this.props.activeDeckNumber] > 21) {
            this.props.changeHandResult('lost');
            this.props.markDeckAsFinished(this.props.activeDeckNumber);
        }
        else if (this.props.playerCardsSum[this.props.activeDeckNumber] === 21
            && !this.props.playerCards[this.props.activeDeckNumber].deckFinished) {
            console.log('enable stand mode');
            this.props.toStand(this.props.activeDeckNumber);
            this.props.markDeckAsFinished(this.props.activeDeckNumber);
            
        }
    }

    render() {
        let renderCardDecks = this.props.playerCards.map((deck,deckIndex)=> {
        return  <div key={`deckContainerNumber${deckIndex}`}
                 className={(deckIndex === this.props.activeDeckNumber ? classes.activeDeck: classes.disableDeck)}>
                    <Deck
                        key={`deckNumber${deckIndex}`}
                        deckCards = {deck}
                        deckSum = {this.props.playerCardsSum[deckIndex]}
                        player
                        deckNumber = {deckIndex}
                        playedHand = {deckIndex === this.props.activeDeckNumber}
                        >
                    </Deck>
                </div>
        });
        // debugger;
        // let sum = props.playerCardsSum;
        console.log('player');
        return (
            <div className={classes.Player}>
                
                <h2>Player's hand</h2>
                <div className={classes.Decks}>
                    {this.props.playerCards.length?
                    renderCardDecks
                    :'' }
                    {/* <Deck
                        deckCards = {this.props.playerCards}
                        deckSum = {this.props.playerCardsSum}
                        player
                    >
                    </Deck>
                    <Deck
                        deckCards = {this.props.playerCards}
                        deckSum = {this.props.playerCardsSum}
                        player
                    >
                    </Deck>
                    <Deck
                        deckCards = {this.props.playerCards}
                        deckSum = {this.props.playerCardsSum}
                        player
                    >
                    </Deck>
                    <Deck
                        deckCards = {this.props.playerCards}
                        deckSum = {this.props.playerCardsSum}
                        player
                    >
                    </Deck>
                    */}
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
        roundStatus : state.round.roundStatus,
        activeDeckNumber : state.cards.activeDeckNumber,
        playerCards : state.cards.playerCards,
        playerCardsSum : state.cards.playerCardsSum,

    }
}

const mapDistpatchToprops = dispatch => {
    return {
        toStand : (activeDeckNumber) => dispatch(actions.stand(activeDeckNumber)),
        markDeckAsFinished : (activeDeckNumber) => dispatch(actions.markDeckAsFinished(activeDeckNumber)),
        changeHandResult : (result) => dispatch(actions.changeHandResult(result)),
        giveOneMoreCard : (activeDeckNumber) => dispatch(actions.addCard('player',activeDeckNumber))

    }
}


export default  connect(MapStateToprops,mapDistpatchToprops)(memo(Player))