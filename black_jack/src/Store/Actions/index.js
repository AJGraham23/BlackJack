import * as actionTypes from "./actionTypes";

export {
    startGame,
    changeBudget
} from './gameAction';

export {
    startRound,
    makeBid,
    roundStatus,
    stand,
    doubleBid
} from './roundAction';

export {
    devideCardForRoundStart,
    addCard,
    changeDeckSum
} from './cardAction';

export const initRound = (newBudget) => {
    return dispatch => {
        return setTimeout(() => {
            dispatch(
                {
                    type:actionTypes.INIT_ROUND,
                    newBudget
                })
        }, 2001);
    }
}


export const splitAnotherDeck = (numOfSplits) => {
    return {
        type:actionTypes.SPLIT_DECK,
        numOfSplits

    }
}