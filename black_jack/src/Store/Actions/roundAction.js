import * as actionTypes from './actionTypes'

export const startRound = (bid) => {
    return {
        type:actionTypes.START_ROUND,
        round : true,
        status:'pending',
        bid
    }
}

export const stand = () => {
    return dispatch => {
        return setTimeout(() => {
            dispatch(
                {
                    type:actionTypes.STAND,
                    stand:true
                })
        }, 1001);
    }
}

export const makeBid = bid => {
    return {
        type:actionTypes.MAKE_BID,
        bid
    }
}

export const roundStatus = (status) => {
    return {
        type:actionTypes.ROUND_STATUS,
        status
    }
}

export const doubleBid = () => {
    return {
        type:actionTypes.DOUBLE_BID
    }
}

// export const splitAnotherDeck = () => {
//     return {
//         type:actionTypes.SPLIT_DECK
//     }
// }