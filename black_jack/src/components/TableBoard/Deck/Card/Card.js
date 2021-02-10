import React from 'react'
import classes from './Card.module.css'


function Card(props) {

    let colour = 'black'
    let cardSuit = '♣';
    switch (props.symbol) {
        case 'diamond':
            colour = 'red';
            cardSuit = '♦'
            break;
        case 'heart':
            colour='red';
            cardSuit = '♥'
            break;
        case 'club':
            cardSuit = '♣';
            break;
        case 'spade':
            cardSuit = '♠'
            break;
        default:
            console.log('cardSuit is not accaptable!');
            console.error('card suit in not accaptable');
            break;
    }


    let cardNumber = props.value;
    switch (cardNumber) {
        case 11:
            cardNumber = props.isAce ? 'A' : 'J';
            // cardNumber = 'J';
            break;
        case 12:
            cardNumber = 'Q';
            break;
        case 13:
            cardNumber = 'K';
            break;
        case 1:
            cardNumber = 'A';
            break;
        default:
            break;
    }
    // if(props.symbol == 'dimond' || 'heart')
    //     colour = 'red'

    
    let CardClass = `${classes.Card} ${props.Hiden ? classes.Hiden : ''}`
    let cardActiveClass = `${props.markCard ? classes.active:classes.disActive}`;
    return (
        <div className={CardClass + ' ' + props.newLine + ' ' + cardActiveClass} style={{'color':colour}}>
            <div className={classes.Value } >
                <span style={{'display':`${props.Hiden ? 'none' : true}`}}>
                    {cardNumber}
                </span>
            </div>
            <div className={classes.Suit}>
                <span style={{'display':`${props.Hiden ? 'none' : true}`}}>
                      {cardSuit}
                </span>
            </div>
        </div>
    )
}

export default React.memo(Card)
