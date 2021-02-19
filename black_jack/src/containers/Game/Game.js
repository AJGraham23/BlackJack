import React, { useEffect, useRef, useState } from 'react'
import classes from './Game.module.css'
import TableBoard from '../../components/TableBoard/TableBoard'
import {connect} from 'react-redux'
import * as actions from '../../Store/Actions/index'


const Game = (props) => {

    const gameRefInitMount = useRef(false);
    const [isInsuranceCollected, setIsInsuranceCollected] = useState(false)
    useEffect(() => {
        if( props.roundStatus === 'decision') 
        {
            if(props.insurance && !isInsuranceCollected)
            {
                if (props.dealerCards[1].Ace && props.dealerCards[0].value > 9 && !props.dealerCards[0].Ace)
                {
                    let x;
                    props.collectInsurance(Math.round(props.roundBids[0]/2));
                
                }
                else {
                    let aaa;
                    props.collectInsurance(-1*Math.round(props.roundBids[0]/2));
                }
                setIsInsuranceCollected({isInsuranceCollected:true})
            }
                // console.log('wtf');
             
             

                console.log('we made it to the desicions phase!')
                let playerResults = [];
                let totalProfit = 0;
                for (const index in props.playerSum) {
                    if (props.playerSum[+index] < 22)
                    {
                        switch (true) {
                            case props.playerSum[+index] - props.dealerSum > 0:
                                playerResults.push('win');
                                totalProfit+= props.roundBids[index];
                                props.collectProfitAndInitBid(props.roundBids[+index],+index)    
                            break;
                            case props.playerSum[+index] - props.dealerSum < 0:
                                playerResults.push('lost');
                                totalProfit-= props.roundBids[index];
                                props.collectProfitAndInitBid(-props.roundBids[+index],+index)
                            break;
                            case props.playerSum[+index] - props.dealerSum === 0:
                                totalProfit+= props.roundBids[index];
                                playerResults.push('tie');
                                props.collectProfitAndInitBid(0,+index)   
                            break;

                            default:
                                alert('something went wrong in [game.js] desicion');
                                break;
                        }   
                    }
                    else
                    {
                        playerResults.push('lost');
                        totalProfit-= props.roundBids[index];
                        props.collectProfitAndInitBid(-props.roundBids[+index],+index)
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
                    totalProfit+= props.roundBids[index];   
                    props.collectProfitAndInitBid(props.roundBids[+index],+index) 
                }
                else {
                    console.log('hand ' + (+index) + 'lost');
                    totalProfit-= props.roundBids[index];   
                    props.collectProfitAndInitBid(-props.roundBids[+index],+index);
                }
            }
            props.initRound();
        }
    }, [props.dealerBust]); 
    
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
    

 
    console.count();


    let finalResualt = '';
    if(props.roundStatus === 'lost' || props.roundStatus === 'win' || props.roundStatus === 'tie')
    {
        finalResualt = props.roundStatus;
    }

    console.log(props.allStand)
    return ( 
      
        
            <div className={classes.Game}>
                <h1>Welcome to Blackjack</h1>
                <p className={classes.roundResualt}>
                    {finalResualt}
                </p>
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
      insurance:state.round.insurance
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
        collectProfitAndInitBid : (profit,bidIndex) => dispatch(actions.collectProfitAndInitBid(profit,bidIndex))
        
    }
}

export default connect(MapStateToProps,mapDistpatchToProps)(Game)