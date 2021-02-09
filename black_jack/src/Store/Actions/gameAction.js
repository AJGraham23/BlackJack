import * as actionTypes from './actionTypes'

export const startGame = () => {
    return dispatch => {

        setTimeout(() => {
            dispatch(startGameNow())
        }, 1001);
    }
    
    
}

export const startGameNow = () => {
    return {
        type:actionTypes.START_GAME,
        start : true

    }
}

export const collectProfits = (profit) => {
    return {
        type:actionTypes.COLLECT_PROFITS,
        profit
    }
}


export const changeBudget = (lastBidSum )=> {
    return {
        type:actionTypes.CHANGE_BUDGET,
        sumBidProfit:lastBidSum
    }
}