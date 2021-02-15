import React, { Component } from 'react'
import Control from './Control/Control'
import classes from './Controls.module.css'
import * as actions from '../../../Store/Actions/index'
import asyncComponent from '../../../hoc/asyncComponent/asyncComponent'
import { connect } from 'react-redux'

export class Controls extends Component {

    state = {
        hitButton:false,
        doubleButton:false,
        splitButton:false,
        standButton:false,
        intervalDisable:false
    }

    doublingBid = () => {
        // console.log(this.props.bamba);
        // this.props.actionPromise('shawarma').then(data=>
        //     {
        //         console.log(data);
        //         console.log(this.props.bamba);
        //     })
        // this.setState({disbaleButtons:true})
        this.disableDoubleClcicks();
        this.props.doubleOperation(this.props.activeDeckNumber);
    }
    
   
    playerCanDouble = () => {
        let totalBidsSum = this.props.bid.reduce((a,b)=>a+b)    
        return  this.props.budget -totalBidsSum - this.props.bid[this.props.activeDeckNumber] > -0.1 
        ? true : false;
    }

    
    
    playerSpliting = () => {
        console.log('split and may god help us');
        this.disableDoubleClcicks();
        this.props.splitDecks(this.props.playerCards.length);
        // this.props.giveOneMoreCard(this.props.split);
    }

    disableDoubleClcicks = () => {
        this.setState({
            intervalDisable: true,
          });
          
          // enable after 5 second
          setTimeout(()=>{
             this.setState({
              intervalDisable: false,
            });
          }, 1000)
    }

    standClicked = () => {
        // this.setState({disbaleButtons:true})
        this.disableDoubleClcicks();
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
        const hitButtonVisibility  = this.props.roundStatus === 'pending' && !this.props.standMode[this.props.activeDeckNumber] && !this.state.intervalDisable;
        const standButtonVisibility  = this.props.roundStatus === 'pending' && !this.props.standMode[this.props.activeDeckNumber] && !this.state.intervalDisable;
        const doubleButtonVisibility = this.playerCanDouble() && this.props.roundStatus === 'pending'
        && !this.props.standMode[this.props.activeDeckNumber] && numOfPlayerCards === 2 && !this.state.intervalDisable;;
        const splitButtonVisibility = this.props.roundStatus === 'pending' && numOfPlayerCards === 2 && this.playerCanDouble()  
        && this.props.playerCards.length<4 && this.areCardsEqual(this.props.playerCards[this.props.activeDeckNumber]) && !this.state.intervalDisable;;
        
        let newButtonState = {
            hitButton:hitButtonVisibility,
            doubleButton:doubleButtonVisibility,
            splitButton:splitButtonVisibility,
            standButton:standButtonVisibility
        }
        // let aaa = "arik like to eat pizza".replace( /to eat (pizza|banan)/,'')
        if(( JSON.stringify(newButtonState) !== JSON.stringify(this.state).replace(/,"intervalDisable":(false|true)/,'')))
            this.setState((state,props)=>({...newButtonState}));
        return (
            <div className={classes.Controls}>
                <Control
                    disableButton={this.state.intervalDisable}
                    // visibility = {hitButtonVisibility ? 'visible':'hidden'}
                    visibility = {this.state.hitButton ? 'visible':'hidden'}
                    clicked={(e)=> {
                       this.disableDoubleClcicks();
                        this.props.giveOneMoreCard(this.props.activeDeckNumber)
                    }}
                >Hit
                </Control>
                <Control
                    // disableButton={this.state.disbaleButtons}
                    clicked={this.standClicked}
                    // visibility={standButtonVisibility ? 'visible':'hidden'}
                    visibility={this.state.standButton ? 'visible':'hidden'}
                >Stand
                </Control>
                 <Control
                    // disableButton={this.state.disbaleButtons}
                    clicked={this.doublingBid}
                    visibility = {this.state.doubleButton ? 'visible':'hidden'}
                    // visibility = {doubleButtonVisibility ? 'visible':'hidden'}
                 >Double</Control>
                <Control
                    // disableButton={this.state.disbaleButtons}
                    clicked={this.playerSpliting}
                    visibility={this.state.splitButton ? 'visible':'hidden'}
                    // visibility={splitButtonVisibility ? 'visible':'hidden'}
                >split
                </Control>
                {this.props.IsDeal ? <Control>Deal</Control>: null} 
            </div>
        )
    }
}


const MapStateToProps = state => {
    return {
        lit : state.round.split,
        bid : state.round.bid,
        budget : state.game.budget,
        standMode : state.round.stand,
        roundStatus : state.round.roundStatus,
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
        doubleOperation : (activeDeckNumber) => dispatch(actions.doubleOperation(activeDeckNumber))

    }
}

export default connect(MapStateToProps,mapDistpatchToProps)(asyncComponent(Controls))