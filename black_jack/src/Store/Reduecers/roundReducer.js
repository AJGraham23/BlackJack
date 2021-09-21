import { actionPromise } from '../Actions'
import * as actionTypes from '../Actions/actionTypes'

const initState = {
    round:false,
    // split:0,
    roundStatus:'',
    handsResult:[''],
    stand:[false],
    dealerBust:false,
    bid:[0],
    originalBid:0,
    insurance:false,
    next:false,
    
}

const orderStandArray = (standArray ,indexToSwitch = 0) => {

    // find index of "false" in standArray
    let subtitutedIndex = standArray.findIndex((standValue,index) => { 
        if(index!== 0)    
            return standValue==false
        
    })

    if(subtitutedIndex === -1)
        subtitutedIndex = 0;

    return standArray.map((standStatus,index)=>{
        // if(index === action.activeDeckIndex)
        // if(index === action.activeDeckIndex)
        //     return stand
        // else return standStatus
        switch (index) {
            case indexToSwitch:
                
                // return standArray[standArray.length-1];
                if(subtitutedIndex==0)
                    return true
                else
                    return standArray[subtitutedIndex];
            case subtitutedIndex:
                return true;
                
            default:
                return standStatus;
        }
    });

}


const orderHandResultArray = (resultsArray,activeDeckIndex) => {
    let subtitutedIndex = resultsArray.findIndex((resultValue,index) => { 
        if(index!== 0)    
            return resultValue==""
        
    });

    if(subtitutedIndex === -1)
    subtitutedIndex = 0;


    let updatedHandsResult = resultsArray.map((result,index)=> {
        // if(result === '' && index !== state.split) 
        //     isPlayingHandExist = true;
        // if(index === state.split)
        if(index === activeDeckIndex)
            return resultsArray[resultsArray.length-1]
        // else if(index === resultsArray.length-1)
        else if(index === subtitutedIndex)
            return 'decision';
        else return result;
    });

    return updatedHandsResult;
}


const reduecer = (state = initState, action) => {
    let newStandArray;
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
            let newBidsArray = state.bid.map((bidAmount,bidIndex)=> {
                if(bidIndex === action.deckIndex)
                    return state.bid[state.bid.length-1]
                else if(bidIndex === action.deckIndex -1)
                    return 0
                else
                    return bidAmount
            });
            return {...state,bid:newBidsArray}

        case actionTypes.DOUBLE_BID:

            let newBidArray = state.bid.map((bidAmount,index)=>{
                if(index === action.numOfSplits)
                    return bidAmount*2
                else return bidAmount
            });

            
            return {...state,
                bid:newBidArray}
        case actionTypes.INIT_ROUND:
            console.log('init game');
            let what = {...initState};
            return {
                ...initState,
            }
        
        case actionTypes.STAND:
            // debugger;
            if(state.stand.length === 1)
            {
                return {
                    ...state,
                    stand:[true],
                    // split:newSplit,
                    handsResult:['decision'],    
                }
            }
            let foundNotFinishedDeck = state.handsResult.find(element => element === '');
            if(foundNotFinishedDeck === '')
            {
                newStandArray = orderStandArray(state.stand);
                let newSplit = state.split;
                if(newSplit)
                newSplit = state.split - 1;
                
                // isPlayingHandExist = false;

                let updatedHandsResult = orderHandResultArray(state.handsResult,action.activeDeckIndex)
                // let updatedHandsResult = state.handsResult.map((result,index)=> {
                //     // if(result === '' && index !== state.split) 
                //     //     isPlayingHandExist = true;
                //     // if(index === state.split)
                //     if(index === action.activeDeckIndex)
                //         return state.handsResult[state.handsResult.length-1]
                //     else if(index === state.handsResult.length-1)
                //         return 'decision';
                //     else return result;
                // })

                // debugger;
                
                return {...state,
                    stand:newStandArray,
                    split:newSplit,
                    handsResult:updatedHandsResult,    
                }
            
            }
        case actionTypes.CHANGE_NEXT_STATUS:
            return {
                ...state,
                next:action.nextValue
            }
       
        case actionTypes.CHANGE_HAND_RESULT:
            // console.log('init game');
            // decrease the split value if it's more than 0
            let newSplitValue = state.split;
            if(newSplitValue)
            newSplitValue = state.split - 1;

            // check if it's the last deck
            let isLastDeck ;
            let countUnfinishedDecks=0;
            for (let index = 0; index < state.handsResult.length; index++) {
                if(state.handsResult[index] === '')
                    countUnfinishedDecks++;
            }

            isLastDeck = countUnfinishedDecks > 1 ? false : true ;

            // isPlayingHandExist = false;
            let newHandsResult = state.handsResult.map((result,index)=> {
                // if(result === '' && index !== state.split)
                //     isPlayingHandExist = true;
                    if(result === '' && isLastDeck)
                        return action.result;
                    else if(index === 0 && !isLastDeck)
                        return state.handsResult[state.handsResult.length-1]
                    else if(index === state.handsResult.length-1)
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
            // newStandArray = orderStandArray(state.stand.concat(false))

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