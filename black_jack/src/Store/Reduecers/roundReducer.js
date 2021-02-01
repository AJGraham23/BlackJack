import * as actionTypes from '../Actions/actionTypes'

const initState = {
    round:false,
    bid:0,
    split:false,
    roundStatus:'',
    // roundResult:'',
    stand:false
}


const reduecer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.START_ROUND:
            return {
                ...state,
                round:true,
                roundStatus:'pending',
                bid:action.bid
            }
        case actionTypes.MAKE_BID:
            return {...state,bid:action.bid}
        case actionTypes.ROUND_STATUS:
            return {...state,
                roundStatus:action.status}
        case actionTypes.STAND:
            return {...state,
                stand:true}
        case actionTypes.DOUBLE_BID:
            return {...state,
                bid:state.bid*2}
        case actionTypes.INIT_ROUND:
            console.log('init game');
            return {
                ...initState,
            }
        default:
            return state;
            
    }
}

export default reduecer;