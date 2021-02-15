import React, { Component } from 'react'
import classes from './Money.module.css'
import {connect} from 'react-redux'
import * as actions from '../../../Store/Actions/index'



export class Money extends Component {


    state = {
        lastRoundBid:0
    }

    mySubmitFunction = function(e) {
        if(!this.bidInputValue)
            this.bidInputValue = 0;
        if(this.bidInputValue>this.props.playerBadget)
            this.bidInputValue = this.props.playerBadget;
        e.preventDefault();
        if(this.bidInputValue !== 0) {
            this.props.startRound(this.bidInputValue);
            this.setState({lastRoundBid:this.bidInputValue})

            
        }
        else alert('bid must be more than 0')
    }

    inputEventHandler = e => {
        
        this.bidInputValue = e.target.value;
        if(this.bidInputValue > this.props.playerBadget)
        {
            e.target.value = this.props.playerBadget;
        }
    }

    render() {
        // calc budget left 
        let totalBids = +this.props.roundbid.reduce((a,b)=> a+b,0);
        
        if(this.props.roundbid[0])
            this.bidInputValue = this.props.roundbid[0];
        else this.bidInputValue = this.state.lastRoundBid;
        return (
            <div className={classes.Money}>
                <div className={classes.budget}>
                   budget: <div>
                        {this.props.round 
                        ? this.props.playerBadget- totalBids  
                        : this.props.playerBadget }$
                       </div>
                </div>
                {
                <form onSubmit={e=>this.mySubmitFunction(e)}>
                    <label
                     >bid : </label>
                    <input 
                        disabled={this.props.round}
                        type="number"
                        id="amount"
                        name="amount" 
                        min="1" 
                        className={classes.bidAmountInput}
                        onChange={e => this.inputEventHandler(e)}
                        placeholder={this.props.roundbid[0] > 0 ? this.props.roundbid[0] : 'bid amount'}
                        max={this.props.playerBadget}></input>
                    <input className={classes.submitBet} disabled={this.props.round}  type="submit" value="deal"></input>
                </form>}
            </div>
        )
    }
}



const MapStateToProps = state => {
    return {
        playerBadget : state.game.budget,
        playing : state.game.isPlaying,
        round : state.round.round,
        roundbid : state.round.bid
    }
}

const mapDistpatchToProps = dispatch => {
    return {
        startRound : (bid) => dispatch(actions.startRound(bid)),
        // makeBid : (bid) => dispatch(actions.makeBid(bid)),
        devideCards : () => dispatch(actions.devideCardForRoundStart())
    }
}

export default connect(MapStateToProps,mapDistpatchToProps)(Money)