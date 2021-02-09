import * as actionTypes from "./actionTypes";

export {
    startGame,
    changeBudget,
    collectProfits
} from './gameAction';

export {
    startRound,
    // makeBid,
    dealerBust,
    changeHandResult,
    roundStatus,
    stand,
    doubleBid
} from './roundAction';

export {
    devideCardForRoundStart,
    addCard,
    changeDeckSum
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