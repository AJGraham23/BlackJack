import { actionPromise } from '../Actions'
import * as actionTypes from '../Actions/actionTypes'

const initState = {
    round:false,
    split:0,
    roundStatus:'',
    handsResult:[''],
    stand:[false],
    dealerBust:false,
    bid:[0],
    originalBid:0,
    insurance:false
}


const reduecer = (state = initState, action) => {

    switch (action.type) {
        case actionTypes.START_ROUND:
            return {
                ...state,
                round:true,
                roundStatus:'pending',
                bid:[+action.bid],
                originalBid:+action.bid
            }
        case actionTypes.INSURANCE:
            return {
                ...state,
                insurance:true
            }
        // case actionTypes.COLLECT_INSURANCE:
        //     return {
        //         ...state,
        //         insurance:false
        //     }
        case actionTypes.ROUND_STATUS:
            return {...state,
                roundStatus:action.status
            }
        case actionTypes.INIT_ROUND_BID:
            // debugger;
            let newBidsArray = state.bid.map((bidAmount,bidIndex)=> {
                if(bidIndex === action.deckIndex)
                    return 0
                else
                    return bidAmount
            });
            return {...state,bid:newBidsArray}

        case actionTypes.DOUBLE_BID:
            // debugger;

            let newBidArray = state.bid.map((bidAmount,index)=>{
                if(index === action.numOfSplits)
                    return bidAmount*2
                else return bidAmount
            });

            
            return {...state,
                bid:newBidArray}
        case actionTypes.INIT_ROUND:
            console.log('init game');
            return {
                ...initState,
            }
        
        case actionTypes.STAND:
            let newStandArray = state.stand.map((standStatus,index)=>{
                if(index === action.activeDeckIndex)
                    return true
                else return standStatus
            });
            let newSplit = state.split;
            if(newSplit)
            newSplit = state.split - 1;
            
            // isPlayingHandExist = false;
            let updatedHandsResult = state.handsResult.map((result,index)=> {
                // if(result === '' && index !== state.split) 
                //     isPlayingHandExist = true;
                // if(index === state.split)
                if(index === action.activeDeckIndex)
                    return 'decision';
                else return result;
            })
            
            return {...state,
                stand:newStandArray,
                split:newSplit,
                handsResult:updatedHandsResult,    
            }
            // if(isPlayingHandExist)
            // else 
            //     return {
            //         ...state,
            //         stand:newStandArray,
            //         split:newSplit,
            //         handsResult:updatedHandsResult,
            //         // roundStatus:'decision'
            //     }
        
        case actionTypes.CHANGE_HAND_RESULT:
            // console.log('init game');
            // decrease the split value if it's more than 0
            let newSplitValue = state.split;
            if(newSplitValue)
            newSplitValue = state.split - 1;

            // isPlayingHandExist = false;
            let newHandsResult = state.handsResult.map((result,index)=> {
                // if(result === '' && index !== state.split)
                //     isPlayingHandExist = true;
                if(index === state.split)
                    return action.result;
                else return result;
            })
            return {
                ...state,
                handsResult: newHandsResult,
                split:newSplitValue
            }
            // if(isPlayingHandExist)
            // else
            //     return {
            //         ...state,
            //         handsResult: newHandsResult,
            //         // roundStatus:'desicion',
            //         split:newSplitValue
            //     }
        case actionTypes.SPLIT_DECK:
            // debugger;
            return {
                ...state,
                split:action.numOfSplits,
                bid:state.bid.concat(+state.originalBid),
                stand:state.stand.concat(false),
                handsResult: [...state.handsResult,'']

            }
        case actionTypes.DEALER_BUST:
            return {
                ...state,
                dealerBust:true
            }
        default:
            return state;
            
    }
}

export default reduecer;