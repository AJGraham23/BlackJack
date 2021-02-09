import React, { Component } from 'react'
import Control from './Control/Control'
import classes from './Controls.module.css'
import * as actions from '../../../Store/Actions/index'
import asyncComponent from '../../../hoc/asyncComponent/asyncComponent'
import { connect } from 'react-redux'

export class Controls extends Component {


    doublingBid = () => {
        this.props.doubleBid(this.props.split);
        this.props.giveOneMoreCard(this.props.split);
        this.props.toStand(this.props.split);
    }
    
    componentDidUpdate = () => {
        // this.pizza = 2;
        // debugger;
        if(this.props.playerCards[this.props.split].length < 2 && this.props.roundStatus === 'pending')
            this.props.giveOneMoreCard(this.props.split);

    }

    playerCanDouble = () => {
        let totalBidsSum = this.props.bid.reduce((a,b)=>a+b)    
        return  this.props.budget -totalBidsSum - this.props.bid[this.props.split] > -0.1 
        ? true : false;
    }

    
    
    playerSpliting = () => {
        console.log('split and may god help us');
        this.props.splitDecks(this.props.split);
        // this.props.giveOneMoreCard(this.props.split);
    }

    areCardsEqual = (cards) => {
        return cards[0].value === cards[1].value;
    }

    render() {
        console.count();
        // debugger;
        let numOfPlayerCards = this.props.playerCards[this.props.split].length;
        const hitButtonVisibility  = this.props.roundStatus === 'pending' && !this.props.standMode[this.props.split];
        const standButtonVisibility  = this.props.roundStatus === 'pending' && !this.props.standMode[this.props.split];
        const doubleButtonVisibility = this.playerCanDouble() && this.props.roundStatus === 'pending'
        && !this.props.standMode[this.props.split] && numOfPlayerCards === 2;
        const splitButtonVisibility = this.props.roundStatus === 'pending' && numOfPlayerCards === 2
        && this.props.playerCards.length<4 && this.areCardsEqual(this.props.playerCards[this.props.split]);
        return (
            <div className={classes.Controls}>
                {/* hit */}
                <Control
                    visibility = {hitButtonVisibility ? 'visible':'hidden'}
                    clicked={this.props.giveOneMoreCard.bind(this,this.props.split)}
                >Hit
                </Control>
                {/* {this.props.roundStatus === 'pending' && !this.props.standMode ? 
                : ''} */}

                {/* Stand */}
                <Control
                    clicked={this.props.toStand.bind(this,this.props.split)}
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
        split : state.round.split,
        bid : state.round.bid,
        budget : state.game.budget,
        standMode : state.round.stand,
        roundStatus : state.round.roundStatus,
        // numOfPlayerCards : state.cards.playerCards.length,
        playerCards : state.cards.playerCards,
        

    }
}

const mapDistpatchToProps = dispatch => {
    return {
        giveOneMoreCard : (NumOfsplits) => dispatch(actions.addCard('player',NumOfsplits)),
        toStand : (NumOfsplits) => dispatch(actions.stand(NumOfsplits)),
        doubleBid : (numOfSplits) => dispatch(actions.doubleBid(numOfSplits)),
        splitDecks : (numOfSplits) => dispatch(actions.splitAnotherDeck(numOfSplits))
        
    }
}

export default connect(MapStateToProps,mapDistpatchToProps)(asyncComponent(Controls))