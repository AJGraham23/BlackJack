import * as actionTypes from './actionTypes'

export const startRound = (bid) => {
    return {
        type:actionTypes.START_ROUND,
        round : true,
        status:'pending',
        bid
    }
}

export const stand = (activeDeckIndex) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                dispatch(
                    {
                        type:actionTypes.STAND,
                        stand:true,
                        activeDeckIndex
                    })

                    resolve('stand was triggered on deck '+ activeDeckIndex);
            }, 101);
            
        })
    }
}

// export const makeBid = bid => {
//     return {
//         type:actionTypes.MAKE_BID,
//         bid
//     }
// }

export const roundStatus = (status) => {
    return {
        type:actionTypes.ROUND_STATUS,
        status
    }
}

export const doubleBid = (numOfSplits) => {

    return dispatch=>
    {
        return new Promise((resolve, reject) => {
            
            dispatch({
             type:actionTypes.DOUBLE_BID,
             numOfSplits
            });
            resolve('double bid was triggered on deck: '+ numOfSplits);
        })
    }
}

export const changeHandResult = (result) => {
    return {
        type: actionTypes.CHANGE_HAND_RESULT,
        result
    }
}

export const dealerBust = () => {
    return {
        type:actionTypes.DEALER_BUST
    }
}
// export const splitAnotherDeck = () => {
//     return {
//         type:actionTypes.SPLIT_DECK
//     }
// }