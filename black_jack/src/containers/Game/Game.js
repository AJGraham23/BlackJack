import React, { useEffect, useRef } from 'react'
import classes from './Game.module.css'
import TableBoard from '../../components/TableBoard/TableBoard'
import {connect} from 'react-redux'
import * as actions from '../../Store/Actions/index'


const Game = (props) => {

    const gameRefInitMount = useRef(false);
   
    useEffect(() => {
        if(props.stand && props.roundStatus === 'decision') 
        {
            
            console.log(props);
            if(props.dealerSum > props.playerSum)
                {
                    console.log('dealer wins');
                    props.changeRoundStatus('lost');
                    props.initRound(props.budget - (+props.roundBid))
                }
                else if(props.dealerSum < props.playerSum)
                {
                    props.changeRoundStatus('win');
                    console.log('player wins');
                    props.initRound(props.budget + (+props.roundBid))
                }
                else 
                {
                    console.log('Tie');
                    props.changeRoundStatus('tie');
                    props.initRound(props.budget)
                }

        }
        else if(props.roundStatus === 'lost' || props.roundStatus==='win')
        {
            props.initRound(props.roundStatus === 'lost' ?(+props.budget)-(+props.roundBid) :
            (+props.roundBid) + (+props.budget))

        }
    }, [props.roundStatus]); 
        
    useEffect(() => {
        // debugger;
        // debugger;
        if(gameRefInitMount.current) {
            console.log('rendering Game from use effect');
            console.log(props);
            if(!props.dealerCards.length && props.roundStatus === 'pending')
                {
                    // debugger;
                    props.devideStartingCards();
                }
        }
        

        else {
            gameRefInitMount.current = true
        }
    }, [props.roundStarted])
    

 
    // const checkStatus = () => {
    //     if(props.dealerCards.legth) {
    //         let sum = 0;
    //         let cards = props.dealerCards;
    //         for(let card of cards)
    //         {
    //             sum = sum + card.value;
    //         }
            
    //     }
    // }
    // console.log('game');
    console.count();


    let finalResualt = '';
    if(props.roundStatus === 'lost' || props.roundStatus === 'win' || props.roundStatus === 'tie')
    {
        finalResualt = props.roundStatus;
    }
    return ( 
        // new Promise((res,rej)=> {

        //     return setTimeout(()=>{},3000);
        // }).then(data => {
        
        //     console.log('3 sec is up');
        //     console.log(data);
        // });

        
        // this.checkStatus();

        
            <div className={classes.Game}>
                <h1>Welcome to Blackjack</h1>
                <p>
                    {finalResualt}
                    {/* {props.roundStatus === 'lost'?'dealer won': props.roundStatus === 'win' ? 'you won' : ''} */}
                </p>
                <TableBoard>

                </TableBoard>
                
            </div>
        
    )

}
const MapStateToProps = state => {
    return {
      dealerCards:state.cards.dealerCards,
      playerCards:state.cards.playerCards,
      roundStatus:state.round.roundStatus,
      roundBid:state.round.bid,
      budget:state.game.budget,
      dealerSum:state.cards.dealerCardsSum,
      playerSum:state.cards.playerCardsSum,
      stand:state.round.stand,
      roundStarted:state.round.round
    }
}

const mapDistpatchToProps = dispatch => {
    return {
        // startGame : () => dispatch(actions.startGame()),
        changeRoundStatus : (status) => dispatch(actions.roundStatus(status)),
        initRound : (newBudget) => dispatch(actions.initRound(newBudget)),
        devideStartingCards : () => dispatch(actions.devideCardForRoundStart())
        
    }
}

export default connect(MapStateToProps,mapDistpatchToProps)(Game)