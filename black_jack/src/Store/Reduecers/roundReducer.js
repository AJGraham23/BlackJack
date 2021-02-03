import { stand } from '../Actions'
import * as actionTypes from '../Actions/actionTypes'

const initState = {
    round:false,
    bid:0,
    split:0,
    roundStatus:'',
    // roundResult:'',
    stand:[false]
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
                roundStatus:action.status
            }
        case actionTypes.STAND:
            let newStandArray = state.stand.map((standStatus,index)=>{
                if(index === action.numOfSplits)
                    return true
                else return standStatus
            });
            return {...state,
                stand:newStandArray
            }
        case actionTypes.DOUBLE_BID:
            return {...state,
                bid:state.bid*2}
        case actionTypes.INIT_ROUND:
            console.log('init game');
            return {
                ...initState,
            }
        case actionTypes.SPLIT_DECK:
            // debugger;
            return {
                ...state,
                split:state.split + 1,
                bid:state.bid*2,
                stand:state.stand.concat(false)
            }
        default:
            return state;
            
    }
}

export default reduecer;