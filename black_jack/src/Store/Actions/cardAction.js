import * as actionTypes from './actionTypes'


export const devideCardForRoundStart = () => {
    return dispatch => {

        return setTimeout(() => {
            let FirstCard={
                value:7,
                symbol:'diamond',
                Ace: false
            };

            let SecondCard={
                value:7,
                symbol:'club',
                Ace: false
            };

            let dealerCards = [GenerateRandomCard(),GenerateRandomCard()];
            
            let dealerSum = checkCardsSum(dealerCards);
            // if(FirstCard.value > 10)
            //     FirstCard.value = 10;
            // if(FirstCard.value === 1)
            //     FirstCard.value = 11;
            // if(SecondCard.value > 10)
            //     SecondCard.value = 10;
            // if(SecondCard.value === 1)
            //     SecondCard.value = 11;
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
        }, 1001);
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



export const addCard = (holder,NumOfsplits) => {
    return dispatch => {
        // debugger;


        return setTimeout(() => {
            let card = GenerateRandomCard();
            
            // if (card.value > 10)
            //     card.value = 10;
            if(card.Ace)
                card.value = 11;
            
            dispatch(
                {
                    type: actionTypes.ADD_CARD,
                    card,
                    holder,
                    NumOfsplits
                })
        }, 1001);
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
        }, 300);
    }
}
// what