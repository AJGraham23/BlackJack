import React, { Component, memo } from 'react'
import Deck from '../Deck/Deck'
import classes from './Player.module.css'
import * as actions from '../../../Store/Actions/index'
import { connect } from 'react-redux'
import isEqual from 'lodash/isEqual';

 

class Player extends Component {

    // state = {
    //     newCardWait:false
    // }

    // static getDerivedStateFromProps(props, state){
    //     debugger;
    // }
    // shouldComponentUpdate = (nextProps,nextState) => {

    //     debugger;
    //     return true;
    // }
    // what = (st) => {
    //     return st
    // }
    // getSnapshotBeforeUpdate(prevProps, prevState) {
    //     debugger;
    // }
    componentDidUpdate = (prevProps,prevState,snapshot) => {
        if(this.props.playerCards.length)
        {
            if(this.props.playerCards[0].length < 2 && this.props.roundStatus === 'pending' 
            // in case of split && double => check if not only the stand prop changes
            // because the component re-renders every stand prop change , this is workaround againts extra card in 2+ unfinished
            // hands situation when one hand is with 1 card and the other just automaticly finished.
            && !(!isEqual(prevProps.stand,this.props.stand) && isEqual(prevProps.playerCards,this.props.playerCards))
            )
            {
                        this.props.giveOneMoreCard(0);                
            }

            else {

                    // cards sum is 21 or over
                    if(this.props.playerCardsSum[0] > 21
                        && isEqual(prevProps.stand,this.props.stand)
                        //  && this.props.playerCards[0].deckFinished
                        ) {
                        console.log('changing handresult - player.js')
                        // this.props.updateDeckResult('BUST!');
                        if(!this.props.stand[0]) {
                            this.props.toStand(0);
                            this.props.markDeckAsFinished(0);
                        }
                    }
                    else if (this.props.playerCardsSum[0] === 21
                        && isEqual(prevProps.stand,this.props.stand)
                        // && !this.props.playerCards[0].deckFinished
                        ) {
                            console.log('enable stand mode');
                        if(!this.props.stand[0]) {
                            this.props.updateDeckResult('BLACKJACKKKK!');
                            this.props.toStand(0);
                            this.props.markDeckAsFinished(0);
                        }
                        // this.props.toStand(0);
                        // this.props.markDeckAsFinished(0);
                        
                    }
                    // if(this.state.newCardWait)
                    // {
                    //     setTimeout(() => {
                    //         this.setState(({newCardWait:false}))
                    //     }, 300);
                    // }
            }
        }
    }

    render() {
        let renderCardDecks = this.props.playerCards.map((deck,deckIndex)=> {
        return  <div key={`deckContainerNumber${deckIndex}`}
                 className={(deckIndex === 0 ? classes.activeDeck: classes.disableDeck)}>
                    <Deck
                        key={`deckNumber${deckIndex}`}
                        deckCards = {deck}
                        deckSum = {this.props.playerCardsSum[deckIndex]}
                        player
                        deckNumber = {deckIndex}
                        playedHand = {deckIndex === 0}
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
        // activeDeckNumber : state.cards.activeDeckNumber,
        playerCards : state.cards.playerCards,
        playerCardsSum : state.cards.playerCardsSum,
        stand: state.round.stand
        

    }
}

const mapDistpatchToprops = dispatch => {
    return {
        toStand : (activeDeckNumber) => dispatch(actions.stand(activeDeckNumber)),
        markDeckAsFinished : (activeDeckNumber) => dispatch(actions.markDeckAsFinished(activeDeckNumber)),
        changeHandResult : (result) => dispatch(actions.changeHandResult(result)),
        updateDeckResult : (result) => dispatch(actions.updateDeckResult(result)),
        giveOneMoreCard : (activeDeckNumber) => dispatch(actions.addCard('player',activeDeckNumber))

    }
}


export default  connect(MapStateToprops,mapDistpatchToprops)(memo(Player))