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
        insuranceButton:false,
        intervalDisable:false
    }

 
    doublingBid = () => {
        this.disableDoubleClcicks();
        this.props.doubleOperation(0,this.props.playerCards);
    }
    
   
    playerCanDouble = () => {
        let totalBidsSum = this.props.bid.reduce((a,b)=>a+b)    
        return  this.props.budget -totalBidsSum - this.props.bid[0] > -0.1 
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
        this.props.toStand(0);
        this.props.markDeckAsFinished(0)
    }

    clickMakeInsurance = () => {
        this.disableDoubleClcicks();
        this.props.makeInsurance(); 
    }

    didPlayerFinished = () => {
        let foundHandNotInStand = this.props.standMode.find(hand => hand === false)
        if(foundHandNotInStand === undefined)
            return false;
        else 
            return true
        // let handNotInStand = this.props.stand.find(hand => hand === false)
    }

    areCardsEqual = (cards) => {
        return cards[0].value === cards[1].value;
    }
    componentDidMount = () => {
        this.updateControls();
    }
    componentDidUpdate = () => {
        this.updateControls();
    }
    updateControls = () => {
        let numOfPlayerCards = this.props.playerCards[0].length;
        
        const hitButtonVisibility  = this.props.roundStatus === 'pending' && !this.props.standMode[0] && !this.state.intervalDisable;
        
        const standButtonVisibility  = this.props.roundStatus === 'pending' && !this.props.standMode[0] && !this.state.intervalDisable;
        
        const doubleButtonVisibility = this.playerCanDouble() && this.props.roundStatus === 'pending'
        && !this.props.standMode[0] && numOfPlayerCards === 2 && !this.state.intervalDisable;;
        
        const splitButtonVisibility = this.props.roundStatus === 'pending' && numOfPlayerCards === 2 && this.playerCanDouble()  
        && this.props.playerCards.length<4 && this.areCardsEqual(this.props.playerCards[0]) && !this.state.intervalDisable && this.didPlayerFinished();
        
        const InsuranceButtonVisibility = this.props.dealerCards[1].Ace && this.props.bid[0] > 1 && (this.props.budget - Math.round(this.props.bid[0]*1.5) > 0) && !this.props.insurance ; 
        
        let newButtonState = {
            hitButton:hitButtonVisibility,
            doubleButton:doubleButtonVisibility,
            splitButton:splitButtonVisibility,
            standButton:standButtonVisibility,
            insuranceButton:InsuranceButtonVisibility
        }

        
        // let aaa = "arik like to eat pizza".replace( /to eat (pizza|banan)/,'')
        if(( JSON.stringify(newButtonState) !== JSON.stringify(this.state).replace(/,"intervalDisable":(false|true)/,'')))
            this.setState(()=>({...newButtonState}));
    }

    render() {
        console.count();
     
        console.log(this.state);
        return (
            <div className={classes.Controls}>
                <Control
                    disableButton={this.state.intervalDisable}
                    // visibility = {hitButtonVisibility ? 'visible':'hidden'}
                    visibility = {this.state.hitButton ? 'visible':'hidden'}
                    clicked={(e)=> {
                       this.disableDoubleClcicks();
                        this.props.giveOneMoreCard(0)
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
                <Control
                    clicked={() => {
                        // this.disableDoubleClcicks();
                        // this.props.makeInsurance(); 
                        this.clickMakeInsurance();
                        
                    }
                    }
                    visibility={this.state.insuranceButton ? 'visible':'hidden'}
                >insurance
                </Control>
                {this.props.IsDeal ? <Control>Deal</Control>: null} 
            </div>
        )
    }
}


const MapStateToProps = state => {
    return {
        // lit : state.round.split,
        bid : state.round.bid,
        budget : state.game.budget,
        standMode : state.round.stand,
        roundStatus : state.round.roundStatus,
        playerCards : state.cards.playerCards,
        dealerCards : state.cards.dealerCards,
        bamba : state.cards.bamba,
        insurance : state.round.insurance,
        // activeDeckNumber : state.cards.activeDeckNumber

        
        

    }
}

const mapDistpatchToProps = dispatch => {
    return {
        giveOneMoreCard : (activeDeckNumber) => dispatch(actions.addCard('player',activeDeckNumber)),
        toStand : (activeDeckNumber) => dispatch(actions.stand(activeDeckNumber)),
        markDeckAsFinished : (activeDeckNumber) => dispatch(actions.markDeckAsFinished(activeDeckNumber)),
        // doubleBid : (activeDeckNumber) => dispatch(actions.doubleBid(activeDeckNumber)),
        splitDecks : (activeDeckNumber) => dispatch(actions.splitAnotherDeck(activeDeckNumber)),
        actionPromise : (activeDeckNumber) => dispatch(actions.actionPromise(activeDeckNumber)),
        doubleOperation : (activeDeckNumber,playerCards) => dispatch(actions.doubleOperation(activeDeckNumber,playerCards)),
        makeInsurance : () => dispatch(actions.makeInsurance())

    }
}

export default connect(MapStateToProps,mapDistpatchToProps)(asyncComponent(Controls))