import * as actionTypes from '../Actions/actionTypes'

const initState = {
    dealerCards:[],
    dealerCardsSum:0,
    playerCards:[],
    playerCardsSum:[],
}

// demonstration
const playerDecks = {
    playerCards: [
        [{
            value:'value',
            symbol:'synbol',
            isAce:'true/false'
        },
        {   value:'value',
            symbol:'synbol',
            isAce:'true/false'
        }],
        [],
        []
    ]
}


const checkForDifferentSum = cards => {
    let countAces = 0;
    let sum = 0;
    
    for(let card of cards)
    {
        if(card.value > 10 && !card.Ace)
        sum = sum + 10;
        else if(card.Ace)    
        {
            countAces++;
            sum+=11;
        }
        else sum+=card.value;
    }   
    let closestToPassed = sum;
    if(countAces)
    {   
        for (let index = 1; index < countAces + 1; index++) {
            if(sum - index*10 < 22)
                return (sum - index*10)
            closestToPassed = (sum - index*10)    
        }   
    }
    return closestToPassed;
}

// const checkNumOfAces = (cards) => {
//         let count = 0;
//         for(let card of cards)
//         {
//             if(card.Ace)
//             {
//                 count++;
//                 //do something
//             }
//         }
        
// }

const reduecer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.DEVIDE_STARTING_CARDS:
            let playerSum = action.playerCardsSum;
            if(action.playerCardsSum>21)
                playerSum = checkForDifferentSum(action.playerCards);
            let dealerSum = action.dealerCardsSum;
            if(action.dealerCardsSum>21)
                dealerSum = checkForDifferentSum(action.dealerCards);
            return {...state,
                dealerCards:action.dealerCards,
                playerCards:[...state.playerCards ,action.playerCards],
                playerCardsSum:[...state.playerCardsSum,playerSum],
                dealerCardsSum:dealerSum
            }
        case actionTypes.ADD_CARD:
            // debugger;

            let sum ;
            if(action.card.value > 10 && !action.card.Ace)
                sum = 10 + (action.holder === 'player' ? state.playerCardsSum[action.NumOfsplits] : state.dealerCardsSum);
            else
                sum = action.card.value + (action.holder === 'player' ? state.playerCardsSum[action.NumOfsplits] : state.dealerCardsSum);
            if(sum > 21)
                sum = checkForDifferentSum([...(action.holder === 'player' ? state.playerCards[action.NumOfsplits] : state.dealerCards) , action.card]);
       

            if(action.holder === 'player')
            {
                let playerCardsSumArray = state.playerCardsSum.map((value,index)=>{
                    if(index === action.NumOfsplits)
                        return sum;
                    else return value;
                })

                let newPlayerCards = state.playerCards.map((deck,deckIndex)=>{
                    if(deckIndex === action.NumOfsplits)
                        return [...state.playerCards[deckIndex],action.card]
                    else return state.playerCards[deckIndex]
                });

                return {...state,
                playerCards:newPlayerCards,
                playerCardsSum:playerCardsSumArray
                }
            }
            else return {
                ...state,
                    dealerCards:[...state.dealerCards,action.card],
                    dealerCardsSum:sum
            };
        case actionTypes.CHANGE_CARDS_SUM:

            if(action.deckOwner === 'Dealer') 
            {
                return {
                    ...state,
                    dealerCardsSum:action.newSum,
                }
            }
            else {
                let playerCardsSumArray = state.playerCardsSum.map((value,index)=>{
                    if(index === action.NumOfsplits)
                        return action.newSum;
                    else return value;
                })
                return {
                    ...state,
                    playerCardsSum:playerCardsSumArray
                }
            }
        case actionTypes.INIT_ROUND:
            console.log('init game');
            return {
                ...initState
            }
        case actionTypes.SPLIT_DECK:
            debugger;
            // set new card decks for the player after the split
            let firstSplitedCard = state.playerCards[action.numOfSplits][0] 
            let secondSplitedCard = [];
             secondSplitedCard.push( state.playerCards[action.numOfSplits][1]) 
            let newPlayerCards = state.playerCards.map((deck,deckIndex)=>{
                if(deckIndex === action.numOfSplits)
                    return [firstSplitedCard];
                else return deck[deckIndex];
            } ) ;
            newPlayerCards = newPlayerCards.concat([secondSplitedCard]);
            // set new card decks summary array   
            let newPlayerSumCards = state.playerCardsSum.concat(state.playerCardsSum[action.numOfSplits]/2);
            newPlayerSumCards = newPlayerSumCards.map((el,index) => {
                if(index === action.numOfSplits)
                    return el/2
                else return el;
            })
            debugger;
            return {
                ...state,
                playerCards:newPlayerCards,
                playerCardsSum:newPlayerSumCards
                
            }
        default:
            return state;
            
    }
}

export default reduecer;