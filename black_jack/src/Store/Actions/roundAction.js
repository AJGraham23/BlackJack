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
                    //    'stand was triggered on deck ' : <activeDeckIndex>
                    resolve(+ activeDeckIndex);
            }, 300);
            
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
    // return {
    //     type:actionTypes.ROUND_STATUS,
    //     status
    // }
    
    return dispatch=>
    {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                dispatch({
                    type:actionTypes.ROUND_STATUS,
                    status
                });
                resolve('round status will change to: '+ status);
            }, 300);
        })
    }
}

export const doubleBid = (numOfSplits) => {

    return dispatch=>
    {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                dispatch({
                //  type:actionTypes.DOUBLE_BID,
                 type:actionTypes.DOUBLE_BID,
                 numOfSplits,
                //  holder:'player'
                });
                resolve('double bid was triggered on deck: '+ numOfSplits);
            }, 300);
        })
    }
}

export const changeHandResult = (result) => {
    // return {
    //     type: actionTypes.CHANGE_HAND_RESULT,
    //     result
    // }
    return dispatch => {

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                dispatch({
                    type: actionTypes.CHANGE_HAND_RESULT,
                    result  
                });
                resolve('change hand result to :'+result);
            }, 300);
        })
    }
}

export const dealerBust = () => {
   
    return dispatch => {

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                dispatch({
                    type:actionTypes.DEALER_BUST
                });
                resolve('dealr busted !');
            }, 300);
        })
    }
}


export const initDeckBid = (bidDeckIndex) => {
    return dispatch => {

        return new Promise((resolve, reject) => {
            
            dispatch({
                 type:actionTypes.INIT_ROUND_BID,
                 deckIndex:bidDeckIndex
            });
            resolve('bid deck Index : ' +bidDeckIndex);
        })
    }
}



export const makeInsurance = () => {
    return {
        type:actionTypes.INSURANCE
    }
}

// export const markInsuranceAsDone = () => {
//     return {
//         type:actionTypes.MARK_INSURANCE_AS_DONE
//     }
// }

// export const splitAnotherDeck = () => {
//     return {
//         type:actionTypes.SPLIT_DECK
//     }
// }