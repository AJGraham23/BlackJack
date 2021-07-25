import * as actionTypes from "./actionTypes";
import {doubleBid , stand, initDeckBid } from "./roundAction";
import {addCard,markDeckAsFinished} from "./cardAction";
import { collectProfits } from './gameAction'
import { time } from "uniqid";


export {
    startGame,
    collectInsurance,
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
    doubleBid,
    makeInsurance
} from './roundAction';

export {
    devideCardForRoundStart,
    addCard,
    changeDeckSum,
    markDeckAsFinished,
    actionPromise,
    removeDeck
} from './cardAction';

export const initRound = (totalProfit) => {
    return dispatch => {
        return setTimeout(() => {
            dispatch(
                {
                    type:actionTypes.INIT_ROUND,
                    totalProfit
                })
        }, 401);
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


export const doubleOperation = (activeDeck,playerCards) => {
    
    return dispatch => {
        // this.props.doubleBid(this.props.activeDeckNumber);
        // this.props.giveOneMoreCard(this.props.activeDeckNumber);
        // this.props.toStand(this.props.activeDeckNumber);
        // this.props.markDeckAsFinished(this.props.activeDeckNumber);
        dispatch( doubleBid(activeDeck) )
        .then(value =>{
            console.log(value);
            var currentdate = new Date(); 
            var datetime = "Last Sync: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
                console.log(datetime);
                dispatch(addCard('player',activeDeck)).then(value2=>{
                    setTimeout(() => {
                    var currentdate = new Date(); 
                    var datetime = "Last Sync: " + currentdate.getDate() + "/"
                        + (currentdate.getMonth()+1)  + "/" 
                        + currentdate.getFullYear() + " @ "  
                        + currentdate.getHours() + ":"  
                        + currentdate.getMinutes() + ":" 
                        + currentdate.getSeconds();
                        console.log(datetime);
                    
                    console.log(value2);
                    const reducer = (accumulator, currentValue) => accumulator + currentValue;
                    let sumDeck = playerCards[0].reduce(reducer);
                    if(sumDeck<21)
                        dispatch(stand(activeDeck))
                    // .then(value3=>{
                        
                        // console.log(value3);
                    // dispatch(markDeckAsFinished(0))
                    // })
                }, 200);
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


// export const collectInsurance = () => {
//     return dispatch => {

//     }
// }