import React, { useEffect, useRef, useState } from 'react'
import classes from './Game.module.css'
import TableBoard from '../../components/TableBoard/TableBoard'
import {connect} from 'react-redux'
import * as actions from '../../Store/Actions/index'
import AlertBox from '../../components/UI/AlertBox/AlertBox'


const Game = (props) => {

    const gameRefInitMount = useRef(false);
    const [isInsuranceCollected, setIsInsuranceCollected] = useState(false)
    useEffect(() => {
        if( props.roundStatus === 'decision' && props.next) 
        {
            // if(props.insurance && !isInsuranceCollected)
            // {
            //     if (props.dealerCards[1].Ace && props.dealerCards[0].value > 9 && !props.dealerCards[0].Ace)
            //     {
            //         let x;
            //         props.collectInsurance(Math.round(props.roundBids[0]/2));
                
            //     }
            //     else {
            //         let aaa;
            //         props.collectInsurance(-1*Math.round(props.roundBids[0]/2));
            //     }
            //     setIsInsuranceCollected({isInsuranceCollected:true})
            // }
                // console.log('wtf');
             
             

                console.log('we made it to the desicions phase!')
                let playerResults = [];
                let totalProfit = 0;
                
                    if (props.playerSum[+0] < 22 && props.next)
                    {
                        switch (true) {
                            case props.playerSum[+0] - props.dealerSum > 0:
                                playerResults.push('win');
                                props.updateDeckResult(`won ${props.roundBids[0]}$`);
                                totalProfit+= props.roundBids[0];
                                props.collectProfitAndInitBid(props.roundBids[+0],+0)
                            break;
                            case props.playerSum[+0] - props.dealerSum < 0:
                                playerResults.push('lost');
                                props.updateDeckResult(`lost ${props.roundBids[0]}$` );
                                totalProfit-= props.roundBids[0];
                                props.collectProfitAndInitBid(-props.roundBids[+0],+0)
                                break;
                            case props.playerSum[+0] - props.dealerSum === 0:
                                totalProfit+= props.roundBids[0];
                                props.updateDeckResult('Tie');
                                playerResults.push('tie');
                                props.collectProfitAndInitBid(0,+0)   
                            break;

                            default:
                                alert('something went wrong in [game.js] desicion');
                                break;
                        }   
                    }
                    else if(props.next)
                    {
                        playerResults.push('lost');
                        props.updateDeckResult(`BUST \n lost ${props.roundBids[0]}$`);
                        totalProfit-= props.roundBids[0];
                        props.collectProfitAndInitBid(-props.roundBids[+0],+0)
                    }
                    if(props.next)
                        props.changeNextValue(false);
                    props.removeDeck(0);
                
                // for (const index in props.playerSum) {

                //     if (props.playerSum[+index] < 22 && props.next)
                //     {
                //         switch (true) {
                //             case props.playerSum[+index] - props.dealerSum > 0:
                //                 playerResults.push('win');
                //                 totalProfit+= props.roundBids[index];
                //                 props.collectProfitAndInitBid(props.roundBids[+index],+index)
                //             break;
                //             case props.playerSum[+index] - props.dealerSum < 0:
                //                 playerResults.push('lost');
                //                 totalProfit-= props.roundBids[index];
                //                 props.collectProfitAndInitBid(-props.roundBids[+index],+index)
                //             break;
                //             case props.playerSum[+index] - props.dealerSum === 0:
                //                 totalProfit+= props.roundBids[index];
                //                 playerResults.push('tie');
                //                 props.collectProfitAndInitBid(0,+index)   
                //             break;

                //             default:
                //                 alert('something went wrong in [game.js] desicion');
                //                 break;
                //         }   
                //     }
                //     else if(props.next)
                //     {
                //         playerResults.push('lost');
                //         totalProfit-= props.roundBids[index];
                //         props.collectProfitAndInitBid(-props.roundBids[+index],+index)
                //     }
                //     if(props.next)
                //         props.changeNextValue(false);
                //     props.removeDeck(index);
                // }
            if(props.playerSum.length===1)
                props.initRound();
        }
    }, [props.roundStatus,props.next]); 
    
    useEffect(() => {
        if( props.dealerBust  && props.next) 
        {
            console.log('we made it to the dealerBust phase!')
            let totalProfit = 0;
            // for (const 0 in props.playerSum) {
                if (props.playerSum[+0] < 22 && props.next)
                {
                    totalProfit+= props.roundBids[0];   
                    props.updateDeckResult(`dealer BUST \n won ${props.roundBids[0]}$`);
                    props.collectProfitAndInitBid(props.roundBids[+0],+0) 
                }
                else {
                    console.log('hand ' + (+0) + 'lost');
                    props.updateDeckResult(`BUST \n lost ${props.roundBids[0]}$`);
                    totalProfit-= props.roundBids[0];   
                    props.collectProfitAndInitBid(-props.roundBids[+0],+0);
                }

                props.changeNextValue(false);
                props.removeDeck(0);
            // }
            if(props.playerSum.length===1)
                props.initRound();
            
        }
    }, [props.dealerBust,props.next]); 
    
    useEffect(() => {
        
        if(gameRefInitMount.current) {
            console.log('rendering Game from use effect');
            console.log(props);
            if(!props.dealerSum && props.roundStatus === 'pending')
            {
                props.devideStartingCards();
            }
        }
        
        
        else {
            gameRefInitMount.current = true
        }
    }, [props.roundStarted])


    useEffect(() => {
        
        if(props.roundStarted && props.insuranceResult !== '') {
         
            if(props.insuranceResult)
            {
                props.updateDeckResult('insurance on spot!');
                props.collectProfitAndInitBid(0,+0);
                props.initRound();
            }
            else {
                props.updateDeckResult(`insurance wrong: lost ${Math.round(props.roundBids[0]/2)}$`);
                props.collectInsurance(-Math.round(props.roundBids[0]/2));
            }


        }


    }, [props.insurance])
    

 
    console.count();


    let finalResualt = '';
    finalResualt = props.lastDeckResult;
    // finalResualt = `dealer BUST 
    // lost ${props.roundBids[0]}$`;
    if(props.roundStatus === 'lost' || props.roundStatus === 'win' || props.roundStatus === 'tie')
    {
        finalResualt = props.roundStatus;
    }

    console.log(props.allStand)
    return ( 
      
        
            <div className={classes.Game}>
                <h1>Welcome to Blackjack</h1>
                <div className={classes.roundResualt}>
                    <p> {finalResualt} 
                    {/* 22323 {'\n sup?'} 222222222222 */}
                    </p>
                </div>
                {/* <AlertBox>
                </AlertBox> */}
                <TableBoard>

                </TableBoard>
                
            </div>
        
    )

}
const MapStateToProps = state => {
    return {
        //   playerCards:state.cards.playerCards,
        //   stand:state.round.stand,
        //   budget:state.game.budget,
        //   allStand:state.round.stand.find(el=> el === false),
      dealerCards:state.cards.dealerCards,
      roundStatus:state.round.roundStatus,
      roundBids:state.round.bid,
      dealerSum:state.cards.dealerCardsSum,
      playerSum:state.cards.playerCardsSum,
      roundStarted:state.round.round,
      dealerBust:state.round.dealerBust,
      insurance:state.round.insurance,
      next:state.round.next,
      lastDeckResult:state.cards.lastDeckResult,
      insuranceResult:state.cards.insuranceResult

    }
}

const mapDistpatchToProps = dispatch => {
    return {
        // startGame : () => dispatch(actions.startGame()),
        // changeRoundStatus : (status) => dispatch(actions.roundStatus(status)),
        // hitOneMoreCard : (newBudget) => dispatch(actions.initRound(newBudget)),
        initRound : (totalProfit) => dispatch(actions.initRound(totalProfit)),
        devideStartingCards : () => dispatch(actions.devideCardForRoundStart()),
        collectInsurance : (insuranceAmount) => dispatch(actions.collectInsurance(insuranceAmount)),
        // collectProfit : (profit) => dispatch(actions.collectProfits(profit)),
        collectProfitAndInitBid : (profit,bidIndex) => dispatch(actions.collectProfitAndInitBid(profit,bidIndex)),
        removeDeck : (deckNumber) => dispatch(actions.removeDeck(deckNumber)),
        changeNextValue : (nextState) => dispatch(actions.changeNextValue(nextState)),
        updateDeckResult : (result) => dispatch(actions.updateDeckResult(result))

    }
}

export default connect(MapStateToProps,mapDistpatchToProps)(Game)