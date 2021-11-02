import * as actionTypes from "./actionTypes";
import {doubleBid , stand, initDeckBid , roundInsurance} from "./roundAction";
import {addCard,markDeckAsFinished,updateDeckResult,checkInsurance} from "./cardAction";
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
    roundInsurance,
    changeNextValue
} from './roundAction';

export {
    devideCardForRoundStart,
    addCard,
    changeDeckSum,
    markDeckAsFinished,
    actionPromise,
    removeDeck,
    updateDeckResult,
    checkInsurance
} from './cardAction';

export const initRound = (totalProfit) => {
    return dispatch => {
        return setTimeout(() => {
            dispatch(
                {
                    type:actionTypes.INIT_ROUND,
                    totalProfit
                })
                // setTimeout(() => {
                //     // the last hand result will be shown for 2 seconds
                //     dispatch(updateDeckResult(''));
                // }, 1000);
            
        }, 401)

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
    const playerDeck = playerCards;
    return dispatch => {
        // this.props.doubleBid(this.props.activeDeckNumber);
        // this.props.giveOneMoreCard(this.props.activeDeckNumber);
        // this.props.toStand(this.props.activeDeckNumber);
        // this.props.markDeckAsFinished(this.props.activeDeckNumber);
        dispatch( doubleBid(activeDeck,playerCards) )
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
                dispatch(addCard('player',activeDeck,'double',playerCards)).then(newCard=>{
                    setTimeout(() => {
                    var currentdate = new Date(); 
                    var datetime = "Last Sync: " + currentdate.getDate() + "/"
                        + (currentdate.getMonth()+1)  + "/" 
                        + currentdate.getFullYear() + " @ "  
                        + currentdate.getHours() + ":"  
                        + currentdate.getMinutes() + ":" 
                        + currentdate.getSeconds();
                        console.log(datetime);
                    
                    console.log('let\'s check the value 2 value:::::::::::::');
                    // debugger;
                    console.log(newCard);
                    // debugger;
                    const reducer = (accumulator, currentValue) => accumulator.value + currentValue.value;
                    let sumDeck = playerCards[0].reduce(reducer) + newCard.value;
                    // // let sumDeck = playerCards[0][0].value + playerCards[0][1].value + playerCards[0][2].value;
                    // if(sumDeck > 21)
                    //     playerCards[0].push(newCard)
                    //     sumDeck = checkForDifferentSum(playerCards[0])
                    // if(sumDeck<21)
                    //     dispatch(stand(activeDeck))
                    //     // .then(value3=>{
                            
                    dispatch(stand(activeDeck))
                        // console.log(value3);
                    // dispatch(markDeckAsFinished(0))
                    // })
                }, 0);
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

export const makeInsurance = () => {
    return dispatch=> {
        
        dispatch(checkInsurance()).then((res) => {
                dispatch(roundInsurance());
        });
    }
}

const checkForDifferentSum = cards => {
    let countAces = 0;
    let sum = 0;
    
    for(let card of cards)
    {
        if(card.value > 10 && !card.Ace)
        sum = sum + 10;
        else if(card.Ace)    
        {
            countAces++;
            sum+=11;
        }
        else sum+=card.value;
    }   
    let closestToPassed = sum;
    if(countAces)
    {   
        for (let index = 1; index < countAces + 1; index++) {
            if(sum - index*10 < 22)
                return (sum - index*10)
            closestToPassed = (sum - index*10)    
        }   
    }
    return closestToPassed;
}

// export const collectInsurance = () => {
//     return dispatch => {

//     }
// }