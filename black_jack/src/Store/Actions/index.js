import * as actionTypes from "./actionTypes";
import {doubleBid , stand, initDeckBid } from "./roundAction";
import {addCard,markDeckAsFinished} from "./cardAction";
import { collectProfits } from './gameAction'


export {
    startGame,
    // changeBudget,
    collectProfits
} from './gameAction';

export {
    startRound,
    // makeBid,
    initDeckBid,
    dealerBust,
    changeHandResult,
    roundStatus,
    stand,
    doubleBid
} from './roundAction';

export {
    devideCardForRoundStart,
    addCard,
    changeDeckSum,
    markDeckAsFinished,
    actionPromise
} from './cardAction';

export const initRound = (totalProfit) => {
    return dispatch => {
        return setTimeout(() => {
            dispatch(
                {
                    type:actionTypes.INIT_ROUND,
                    totalProfit
                })
        }, 2001);
    }
}


export const splitAnotherDeck = (numOfSplits) => {
    return dispatch => {
        return setTimeout(() => {
            dispatch( {
                type:actionTypes.SPLIT_DECK,
                numOfSplits
            })
        }, 2);
        // return dispatch( {
        //     type:actionTypes.SPLIT_DECK,
        //     numOfSplits
        // })
    }
 
}


export const doubleOperation = (activeDeck) => {
    return dispatch => {
        // this.props.doubleBid(this.props.activeDeckNumber);
        // this.props.giveOneMoreCard(this.props.activeDeckNumber);
        // this.props.toStand(this.props.activeDeckNumber);
        // this.props.markDeckAsFinished(this.props.activeDeckNumber);
        dispatch( doubleBid(activeDeck) )
        .then(value =>{
            console.log(value);
            dispatch(addCard('player',activeDeck)).then(value2=>{

                console.log(value2);
                dispatch(stand(activeDeck)).then(value3=>{
                    
                    console.log(value3);
                    dispatch(markDeckAsFinished(value3))
                })
            });
        })

    }
}



export const collectProfitAndInitBid = (profit,bidIndex) => {
    return dispatch => {
        dispatch(collectProfits(profit)).then(data => {
            console.log(data);
            dispatch(initDeckBid(bidIndex))
        })
    }
}