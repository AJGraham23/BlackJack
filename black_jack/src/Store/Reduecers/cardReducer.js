import * as actionTypes from '../Actions/actionTypes'

const initState = {
    dealerCards:[],
    dealerCardsSum:0,
    playerCards:[],
    playerCardsSum:[],
    activeDeckNumber:0,
    preActiveDeckNumber:0,
    bamba:'bamba'
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
        } // + deckFinished : true/false
             // + activeDeck: true/false
        ]
        ,
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

const findActiveDeck = (playerCards) => {
    
    for (const deck in playerCards) {
        if(playerCards[+deck].activeDeck)
            return +deck
    }
    // in a case there is no active deck a new available one will be picked!
    
    for (let index = playerCards.length-1; index > -1; index--) {
        if(!playerCards[+index].deckFinished)
            return index;
        
    }

    //in a case where all the decks are finished and no active deck was found just return -1
    return -1;
}


const orderCardsDecks = (cardsDeck,playerDecksSum,deckNumberToSwitch) => {
    let OrderedCards = cardsDeck.map((deck,index)=> {
        switch (index) {
            case 0:
                return cardsDeck[deckNumberToSwitch]    
            case deckNumberToSwitch:
                return cardsDeck[0]
            default:
                return deck;
        }       
    });

    let OrderedSum = playerDecksSum.map((sum,index)=> {
        switch (index) {
            case 0:
                return playerDecksSum[deckNumberToSwitch]    
                break;
            case deckNumberToSwitch:
                return playerDecksSum[0]
            default:
                return sum;
                break;
        }       
    });

    return { OrderedCards , OrderedSum };
}


const reduecer = (state = initState, action) => {

    switch (action.type) {
        case actionTypes.DEVIDE_STARTING_CARDS:
            let playerSum = action.playerCardsSum;
            action.playerCards.deckFinished = false;
            action.playerCards.activeDeck = true;
            if(action.playerCardsSum>21)
                playerSum = checkForDifferentSum(action.playerCards);
            let dealerSum = action.dealerCardsSum;
            if(action.dealerCardsSum>21)
                dealerSum = checkForDifferentSum(action.dealerCards);
            return {...state,
                dealerCards:action.dealerCards,
                playerCards:[...state.playerCards ,action.playerCards],
                playerCardsSum:[...state.playerCardsSum,playerSum],
                dealerCardsSum:dealerSum,
                activeDeckNumber:0,
                preActiveDeckNumber:0
            }

        case actionTypes.REMOVE_DECK:
            let newPlayerCardsDeckArray = state.playerCards.filter((deck,deckIndex)=> {
                if(+action.deckNumber !== +deckIndex)
                    return deck;
                    
            });
            let newPlayerSumCardsDecks = state.playerCardsSum.filter((sum,sumIndex)=> {
                if(+action.deckNumber !== +sumIndex)
                    return sum;
                    
            });
            let newActiveDeck = newPlayerCardsDeckArray.length -1;
            return {
                ...state,
                activeDeckNumber:newActiveDeck,
                playerCards:newPlayerCardsDeckArray,
                playerCardsSum:newPlayerSumCardsDecks

            }
        case actionTypes.MARK_DECK_AS_FINISHED:
            
            let newPlayerCardsArray = state.playerCards.map((deck,index)=> {
                if(index === action.deckNumber)
                {
                    deck.deckFinished = true;
                    deck.activeDeck = false;
                }
                return deck;
            })
            let preActiveDeckNumber = state.activeDeckNumber;
            let activeDeckNum = findActiveDeck(newPlayerCardsArray);
            //in a case where all the decks are finished just pick the last deck that was active
            // and re-order the cards decks
            let orderedCards = {    OrderedCards:state.playerCards , OrderedSum:state.playerCardsSum  };
            if(activeDeckNum === -1)
            {
                // activeDeckNum = state.playerCards.length - 1;
                activeDeckNum = state.preActiveDeckNumber;
            }
            else
                orderedCards= orderCardsDecks(state.playerCards,state.playerCardsSum,activeDeckNum);
                // ddd

            return {
                ...state,
                activeDeckNumber:activeDeckNum,
                preActiveDeckNumber:preActiveDeckNumber,
                playerCards:orderedCards.OrderedCards,
                playerCardsSum:orderedCards.OrderedSum
            }
        case actionTypes.ADD_CARD:
            let activeDeckIndex = findActiveDeck(state.playerCards);
            activeDeckIndex = 0;
            if(activeDeckIndex === -1)
                activeDeckIndex = state.playerCards.length - 1;
            let sum ;
            if(action.card.value > 10 && !action.card.Ace)
                sum = 10 + (action.holder === 'player' ? state.playerCardsSum[activeDeckIndex] : state.dealerCardsSum);
            else
                sum = action.card.value + (action.holder === 'player' ? state.playerCardsSum[activeDeckIndex] : state.dealerCardsSum);
            if(sum > 21)
                sum = checkForDifferentSum([...(action.holder === 'player' ? state.playerCards[activeDeckIndex] : state.dealerCards) , action.card]);
       

            if(action.holder === 'player')
            {
                let playerCardsSumArray = state.playerCardsSum.map((value,index)=>{
                    if(index === activeDeckIndex)
                        return sum;
                    else return value;
                })

                let newPlayerCards = state.playerCards.map((deck,deckIndex)=>{
                    if(deckIndex === activeDeckIndex)
                    {
                        return state.playerCards[deckIndex].concat(action.card);
                    }
                    else return state.playerCards[deckIndex]
                });
                newPlayerCards[activeDeckIndex].activeDeck = true;
                newPlayerCards[activeDeckIndex].deckFinished = false;
                return {...state,
                playerCards:newPlayerCards,
                playerCardsSum:playerCardsSumArray
                }
            }
            else return {
                ...state,
                    dealerCards:[...state.dealerCards,action.card],
                    dealerCardsSum:sum,
                    activeDeckNumber:activeDeckIndex
            };
        case actionTypes.CHANGE_CARDS_SUM:

            if(action.deckOwner === 'Dealer') 
            {
                return {
                    ...state,
                    dealerCardsSum:action.newSum
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
        case 'renderCardsTOFinishROund':
        case 'bamba':
            return {
                ...state,bamba:'yep'
            }
            // maybe we will render this

        case actionTypes.INIT_ROUND:
            console.log('init game');
            return {
                ...initState
            }
        case actionTypes.SPLIT_DECK:
           
            
            // find active Deck
            let activeDeck = findActiveDeck(state.playerCards);
            if(activeDeck === -1)
                activeDeck = state.playerCards.length - 1;
            
            // set new card decks for the player after the split

            // let firstSplitedCard = state.playerCards[activeDeck][0] 
            let secondSplitedCard = [];
            secondSplitedCard.deckFinished = false;
            secondSplitedCard.activeDeck = true;
            secondSplitedCard.push( state.playerCards[activeDeck][1]);
            
            // map new player cards and take out spiltted card
            let newPlayerCards = state.playerCards.map((deck,deckIndex)=>{
                if(deckIndex === activeDeck){
                    // firstSplitedCard.
                    deck.activeDeck = false;
                    deck.pop();
                    return deck;
                
                }
                else return deck;
            } ) ;
            // add the splitted card as a new deck of cards
            newPlayerCards = newPlayerCards.concat([secondSplitedCard]);
            // set new card decks summary array   
            let newPlayerSumCards = state.playerCardsSum.concat(state.playerCardsSum[activeDeck]/2);
            newPlayerSumCards = newPlayerSumCards.map((el,index) => {
                if(index === activeDeck)
                    return el/2
                else return el;
            })

            let orderedPlayerCards = orderCardsDecks(newPlayerCards,newPlayerSumCards,newPlayerCards.length-1);
            return {
                ...state,
                playerCards:orderedPlayerCards.OrderedCards,
                playerCardsSum:orderedPlayerCards.OrderedSum,
                activeDeckNumber:newPlayerCards.length - 1,
                preActiveDeckNumber:state.activeDeckNumber
                
            }
        default:
            return state;
            
    }
}

export default reduecer;