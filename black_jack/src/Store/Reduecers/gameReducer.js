import * as actionTypes from '../Actions/actionTypes'

const initState = {
    lost:false,
    budget:100,
    isPlaying:false
}

const reduecer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.START_GAME:
                return {...state, isPlaying:true}
        case actionTypes.CHANGE_BUDGET:
                return {...state, budget:state.budget - action.bid}
        case actionTypes.INIT_ROUND:
            console.log('init game');

            let lost = action.newBudget === 0;

            return {
                ...state,
                budget:action.newBudget,
                lost:lost
            }
        default:
            return state;
            
    }
}

export default reduecer;