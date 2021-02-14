import React, { Component } from 'react'
import Control from './Control/Control'
import classes from './Controls.module.css'
import * as actions from '../../../Store/Actions/index'
import asyncComponent from '../../../hoc/asyncComponent/asyncComponent'
import { connect } from 'react-redux'

export class Controls extends Component {


    doublingBid = () => {
        // this.props.doubleBid(this.props.activeDeckNumber);
        // this.props.giveOneMoreCard(this.props.activeDeckNumber);
        // this.props.toStand(this.props.activeDeckNumber);
        // this.props.markDeckAsFinished(this.props.activeDeckNumber);
        // this.props.doubleOperation(this.props.activeDeckNumber)

        // console.log(this.props.bamba);
        // this.props.actionPromise('shawarma').then(data=>
        //     {
        //         console.log(data);
        //         console.log(this.props.bamba);
        //     })
        this.props.doubleOperation(this.props.activeDeckNumber);
    }
    
   
    playerCanDouble = () => {
        let totalBidsSum = this.props.bid.reduce((a,b)=>a+b)    
        return  this.props.budget -totalBidsSum - this.props.bid[this.props.activeDeckNumber] > -0.1 
        ? true : false;
    }

    
    
    playerSpliting = () => {
        console.log('split and may god help us');
        this.props.splitDecks(this.props.playerCards.length);
        // this.props.giveOneMoreCard(this.props.split);
    }

    standClicked = () => {
        this.props.toStand(this.props.activeDeckNumber);
        this.props.markDeckAsFinished(this.props.activeDeckNumber)
    }

    areCardsEqual = (cards) => {
        return cards[0].value === cards[1].value;
    }

    render() {
        console.count();
        // debugger;
        let numOfPlayerCards = this.props.playerCards[this.props.activeDeckNumber].length;
        const hitButtonVisibility  = this.props.roundStatus === 'pending' && !this.props.standMode[this.props.activeDeckNumber];
        const standButtonVisibility  = this.props.roundStatus === 'pending' && !this.props.standMode[this.props.activeDeckNumber];
        const doubleButtonVisibility = this.playerCanDouble() && this.props.roundStatus === 'pending'
        && !this.props.standMode[this.props.activeDeckNumber] && numOfPlayerCards === 2;
        const splitButtonVisibility = this.props.roundStatus === 'pending' && numOfPlayerCards === 2 && this.playerCanDouble() 
        && this.props.playerCards.length<4 && this.areCardsEqual(this.props.playerCards[this.props.activeDeckNumber]);
        return (
            <div className={classes.Controls}>
                {/* hit */}
                <Control
                    visibility = {hitButtonVisibility ? 'visible':'hidden'}
                    clicked={(e)=> this.props.giveOneMoreCard(this.props.activeDeckNumber)}
                >Hit
                </Control>
                {/* {this.props.roundStatus === 'pending' && !this.props.standMode ? 
                : ''} */}

                {/* Stand */}
                <Control
                    clicked={ this.standClicked
                        // ()=> { 
                        // this.props.toStand(this.props.split);
                        // this.props.markDeckAsFinished(this.props.split)
                    }
                    visibility={standButtonVisibility ? 'visible':'hidden'}
                >
                Stand</Control>
                {/* {this.props.roundStatus === 'pending' && !this.props.standMode ?
                : ''} */}
                 <Control
                    clicked={this.doublingBid}
                    visibility = {doubleButtonVisibility ? 'visible':'hidden'}
                 >Double</Control>
                {/* {this.props.playerCanDouble && this.props.roundStatus === 'pending'
                 && !this.props.standMode && this.props.numOfPlayerCards === 2 ? 
                 : ''} */}
                <Control
                    clicked={this.playerSpliting}
                    visibility={splitButtonVisibility ? 'visible':'hidden'}
                >split
                </Control>
                {this.props.IsDeal ? <Control>Deal</Control>: null} 
            </div>
        )
    }
}


const MapStateToProps = state => {
    return {
        // playerCanDouble : state.game.budget - state.round.bid[state.round.split]*2 > -0.1 ? true : false,
        // split : state.round.split,
        bid : state.round.bid,
        budget : state.game.budget,
        standMode : state.round.stand,
        roundStatus : state.round.roundStatus,
        // numOfPlayerCards : state.cards.playerCards.length,
        playerCards : state.cards.playerCards,
        bamba : state.cards.bamba,
        activeDeckNumber : state.cards.activeDeckNumber

        
        

    }
}

const mapDistpatchToProps = dispatch => {
    return {
        giveOneMoreCard : (activeDeckNumber) => dispatch(actions.addCard('player',activeDeckNumber)),
        toStand : (activeDeckNumber) => dispatch(actions.stand(activeDeckNumber)),
        markDeckAsFinished : (activeDeckNumber) => dispatch(actions.markDeckAsFinished(activeDeckNumber)),
        doubleBid : (activeDeckNumber) => dispatch(actions.doubleBid(activeDeckNumber)),
        splitDecks : (activeDeckNumber) => dispatch(actions.splitAnotherDeck(activeDeckNumber)),
        actionPromise : (activeDeckNumber) => dispatch(actions.actionPromise(activeDeckNumber)),
        // doubleOperation : (activeDeckNumber) => dispatch(actions.doubleOperation(activeDeckNumber))
        doubleOperation : (activeDeckNumber) => dispatch(actions.doubleOperation(activeDeckNumber))

    }
}

export default connect(MapStateToProps,mapDistpatchToProps)(asyncComponent(Controls))