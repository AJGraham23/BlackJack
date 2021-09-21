import * as actionTypes from './actionTypes'


export const devideCardForRoundStart = () => {
    return dispatch => {

        return  new Promise((resolve,reject)=> {

        
            setTimeout(() => {
                // let FirstCard={
                //     value:5,
                //     symbol:'diamond',
                //     Ace: false
                // };

                // let SecondCard={
                //     value:5,
                //     symbol:'club',
                //     Ace: false
                // };
                let FirstCard = GenerateRandomCard()
                let SecondCard = GenerateRandomCard()
                FirstCard={
                    value:7,
                    symbol:'diamond',
                    Ace: false
                };

                SecondCard={
                    value:7,
                    symbol:'club',
                    Ace: false
                };
                
                let dealerSecondCard = {
                
                    value:1,
                    symbol:'heart',
                    Ace:true
                }
                let dealerFirstCard = {
                    value:10,
                    symbol:'club',
                    Ace: false                    
                }
                let dealerCards = [dealerFirstCard,dealerSecondCard];
                // let dealerCards = [GenerateRandomCard(),GenerateRandomCard()];
                // let dealerCards = [GenerateRandomCard(),GenerateRandomCard()];
                
                let dealerSum = checkCardsSum(dealerCards);
                if(FirstCard.value > 10)
                    FirstCard.value = 10;
                if(FirstCard.value === 1)
                    FirstCard.value = 11;
                if(SecondCard.value > 10)
                    SecondCard.value = 10;
                if(SecondCard.value === 1)
                    SecondCard.value = 11;
                let playerCards = [FirstCard,SecondCard]
                // let playerCards = [GenerateRandomCard(),GenerateRandomCard()];
                let playerSum = checkCardsSum(playerCards);
                dispatch(
                    {
                        dealerCards : dealerCards,
                        playerCards : playerCards,
                        type: actionTypes.DEVIDE_STARTING_CARDS,
                        playerCardsSum:playerSum,
                        dealerCardsSum:dealerSum
                    })
                    resolve('derive starting cards');
            }, 400);
        }) 
    }
    
    
}

const GenerateRandomCard = () => {
    // random for card value
    const cardSuits = ['club','diamond','heart','spade']
    let cardValue = Math.round(Math.random()*12 + 1);
    // random for card Suit
    let cardSuit = Math.round(Math.random()*3);
    
    return {
        value:cardValue,
        symbol:cardSuits[cardSuit],
        Ace:cardValue===1?true:false
    }
}


const checkCardsSum = (cards) => {
        let sum = 0;
        for(let card of cards)
        {
            if(card.value > 10 && !card.Ace)
                sum = sum + 10;
            else if(card.Ace)
                sum = sum + 11
            else sum = sum + card.value;
        }
        return sum;
}



export const addCard = (holder,NumOfsplits,double) => {
    return dispatch => {

        return new Promise((resolve,reject)=> {

      
            setTimeout(() => {
                let card = GenerateRandomCard();
                // card={
                //     value:7,
                //     symbol:'club',
                //     Ace: false
                // };
                card ={
                    value:7,
                    symbol:'club',
                    Ace: false
                };
                if (card.value > 10)
                    card.value = 10;
                if(card.Ace)
                    card.value = 11;
                
                dispatch(
                    {
                        type: actionTypes.ADD_CARD,
                        card,
                        holder,
                        NumOfsplits,
                        double:double ? true : false
                    })
                    resolve(card);
                    reject('add card FAILED for deck number:'+NumOfsplits);
            }, 100);
         })
    }
}


export const changeDeckSum = (newSum,deckOwner) => {

    return dispatch => {
        return setTimeout(() => {
            dispatch(
                {
                    type: actionTypes.CHANGE_CARDS_SUM,
                    newSum,
                    deckOwner
                })
        }, 0);
    }
}

export const actionPromise = (parameter) => {

    return dispatch => {
        return new Promise((res,rej) => {
            setTimeout(() => {
                dispatch(
                    {
                        type: 'bamba'
                    })  
                    res('bisli');
            }, 2300);
        },);

    }
}

export const removeDeck = (deckNumber) => {
    return dispatch => {
        return setTimeout(() => {
            dispatch({
                type:actionTypes.REMOVE_DECK,
                deckNumber
            })
        }, 1000);
    }
}

export const markDeckAsFinished = (deckNumber) => {
    return dispatch => {

        return setTimeout(() => {
                dispatch({
                    type:actionTypes.MARK_DECK_AS_FINISHED,
                    deckNumber
                })
            },  200);
    }
}

export const updateDeckResult = (result) => {
    return dispatch => {

        return setTimeout(() => {
            setTimeout(() => {
                dispatch({
                    type:actionTypes.UPDATE_DECK_RESULT,
                    lastDeckResult:''
                })
            }, 2000);
            dispatch( {
                type:actionTypes.UPDATE_DECK_RESULT,
                lastDeckResult:result
            });
        },  50);
    }
}
// what

// type:actionTypes.MARK_DECK_AS_FINISHED,
// deckNumber