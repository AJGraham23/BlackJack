import * as actionTypes from '../Actions/actionTypes'

const initState = {
    dealerCards:[],
    dealerCardsSum:0,
    playerCards:[],
    playerCardsSum:0,
}



const checkForDifferentSum = cards => {
    let countAces = 0;
    let sum = 0;
    
    for(let card of cards)
    {
        // if(card.value > 9)
        //     sum+=10;
        // else
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
            // if(index + 1 === countAces)
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
                playerCards:action.playerCards,
                playerCardsSum:playerSum,
                dealerCardsSum:dealerSum
            }
        case actionTypes.ADD_CARD:
            // debugger;

            let sum ;
            if(action.card.value > 10 && !action.card.Ace)
                sum = 10 + (action.holder === 'player' ? state.playerCardsSum : state.dealerCardsSum);
            else
                sum = action.card.value + (action.holder === 'player' ? state.playerCardsSum : state.dealerCardsSum);
            if(sum > 21)
                sum = checkForDifferentSum([...(action.holder === 'player' ? state.playerCards : state.dealerCards) , action.card]);
            // if (cardValue > 10)
            //     cardValue = 10;
            // if (cardValue === 1)
            //     cardValue = 11;
            if(action.holder === 'player')
                return {...state,
                playerCards:[...state.playerCards,action.card],
                playerCardsSum:sum,
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
                // let playerDeck = handleAceCard(state.playerCards,action.indexOfCard);
                return {
                    ...state,
                    playerCardsSum:action.newSum
                }
            }
        case actionTypes.INIT_ROUND:
            console.log('init game');
            return {
                ...initState
            }
        default:
            return state;
            
    }
}


// const handleAceCard = (cardsDeck , cardIndex) => {
    
//     let newCardsDeck = cardsDeck.map((card,cardIndex)=>{
//         if(cardIndex === cardIndex)
//         {
//             return {
//                 value:card.value,
//                 symbol:card.symbol,
//                 Ace:true
//             }
//         }
//         else return card;
//     })

//     return newCardsDeck;
    
// }

export default reduecer;