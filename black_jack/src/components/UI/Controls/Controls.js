import React, { Component } from 'react'
import Control from './Control/Control'
import classes from './Controls.module.css'
import * as actions from '../../../Store/Actions/index'
import asyncComponent from '../../../hoc/asyncComponent/asyncComponent'
import { connect } from 'react-redux'

export class Controls extends Component {


    doublingBid = () => {
        this.props.doubleBid();
        this.props.giveOneMoreCard(this.props.split);
        this.props.toStand();
    }

    componentDidUpdate = () => {
        this.pizza = 2;
    }


    playerSpliting = () => {
        console.log('split and may god help us');
        this.props.splitDecks(this.props.split)
    }

    canPlayerSplit = (cards) => {
        return cards[0].value === cards[1].value;
    }

    render() {
        // debugger;
        let numOfPlayerCards = this.props.playerCards[this.props.split].length;
        const hitButtonVisibility  = this.props.roundStatus === 'pending' && !this.props.standMode;
        const standButtonVisibility  = this.props.roundStatus === 'pending' && !this.props.standMode;
        const doubleButtonVisibility = this.props.playerCanDouble && this.props.roundStatus === 'pending'
        && !this.props.standMode && numOfPlayerCards === 2;
        const splitButtonVisibility = this.props.roundStatus === 'pending' && numOfPlayerCards === 2
        && !this.props.split && this.canPlayerSplit(this.props.playerCards[this.props.split]);
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
                    clicked={this.props.toStand}
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
        playerCanDouble : state.game.budget - state.round.bid*2 > -0.1 ? true : false,
        split : state.round.split,
        standMode : state.round.stand,
        roundStatus : state.round.roundStatus,
        // numOfPlayerCards : state.cards.playerCards.length,
        playerCards : state.cards.playerCards,
        

    }
}

const mapDistpatchToProps = dispatch => {
    return {
        giveOneMoreCard : (NumOfsplits) => dispatch(actions.addCard('player',NumOfsplits)),
        toStand : () => dispatch(actions.stand()),
        doubleBid : () => dispatch(actions.doubleBid()),
        splitDecks : (numOfSplits) => dispatch(actions.splitAnotherDeck(numOfSplits))
        
    }
}

export default connect(MapStateToProps,mapDistpatchToProps)(asyncComponent(Controls))