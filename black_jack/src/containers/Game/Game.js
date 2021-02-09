import React, { useEffect, useRef } from 'react'
import classes from './Game.module.css'
import TableBoard from '../../components/TableBoard/TableBoard'
import {connect} from 'react-redux'
import * as actions from '../../Store/Actions/index'


const Game = (props) => {

    const gameRefInitMount = useRef(false);
    // let playerFinishedHisHands = props.stand.find(standValue => standValue === false)
    useEffect(() => {
        if( props.roundStatus === 'decision') 
        {
            console.log('we made it to the desicions phase!')
            let playerResults = [];
            let totalProfit = 0;
            for (const index in props.playerSum) {
                if (props.playerSum[+index] < 22)
                {
                    switch (true) {
                        case props.playerSum[+index] - props.dealerSum > 0:
                            playerResults.push('win');
                            totalProfit+= props.roundBids[index]*2;
                            props.collectProfit(props.roundBids[+index]*2)
                            break;
                            case props.playerSum[+index] - props.dealerSum === 0:
                                totalProfit+= props.roundBids[index];
                                playerResults.push('tie');
                                props.collectProfit(props.roundBids[+index])

                            break;
                        case props.playerSum[+index] - props.dealerSum < 0:
                            playerResults.push('lost');
                            totalProfit-= props.roundBids[index];
                            props.collectProfit(-props.roundBids[+index])
                            break;

                        default:
                            alert('something went wrong is [game.js] desicion');
                            break;
                    }   
                }
                else
                {
                    playerResults.push('lost');
                    totalProfit-= props.roundBids[index];
                    props.collectProfit(-props.roundBids[+index])
                }
            }
            props.initRound();
        }
    }, [props.roundStatus]); 
    
    useEffect(() => {
        if( props.dealerBust) 
        {
            console.log('we made it to the dealerBust phase!')
            let totalProfit = 0;
            for (const index in props.playerSum) {
                if (props.playerSum[+index] < 22)
                {
                    totalProfit+= props.roundBids[index]*2;   
                    props.collectProfit(props.roundBids[+index]*2) 
                }
                else console.log('hand ' + (+index) + 'lost');
                    totalProfit-= props.roundBids[index]*2;   
                    props.collectProfit(-props.roundBids[+index]) 
            }
            props.initRound();
        }
    }, [props.dealerBust]); 
    
    useEffect(() => {
        
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

    console.log(props.allStand)
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
                <p className={classes.roundResualt}>
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
      roundBids:state.round.bid,
      budget:state.game.budget,
      dealerSum:state.cards.dealerCardsSum,
      playerSum:state.cards.playerCardsSum,
      stand:state.round.stand,
      allStand:state.round.stand.find(el=> el === false),
    //   numOfSplits:state.round.split,
      roundStarted:state.round.round,
      dealerBust:state.round.dealerBust
    }
}

const mapDistpatchToProps = dispatch => {
    return {
        // startGame : () => dispatch(actions.startGame()),
        changeRoundStatus : (status) => dispatch(actions.roundStatus(status)),
        initRound : (totalProfit) => dispatch(actions.initRound(totalProfit)),
        hitOneMoreCard : (newBudget) => dispatch(actions.initRound(newBudget)),
        devideStartingCards : () => dispatch(actions.devideCardForRoundStart()),
        collectProfit : (profit) => dispatch(actions.collectProfits(profit))
        
    }
}

export default connect(MapStateToProps,mapDistpatchToProps)(Game)