import React , {Component} from 'react'
import Card from './Card/Card'
import classes from './Deck.module.css'
import uniqueId from 'uniqid'

class Deck extends Component { 



   render() {
       let cards = 'waiting for a bid';
       if(this.props.deckCards)
       {
            cards = this.props.deckCards.map((card,index)=> {
                return <Card 
                Hiden = {index === 0 && this.props.HideDealerCard  ? true : false}
                value={card.value}
                symbol={card.symbol}
                isAce={card.Ace}
                key={uniqueId(`card${index}-`)}
                markCard = {this.props.playedHand === true}
                >
            </Card> 
            })
        }
        let CardsClass = this.props.playedHand ? classes.activeDeck : classes.disActiveDeck;
        // CardClass = '';
        return (
            
            <div classes={classes.Decks}>
                <div className={classes.Cards}>
                    <div className={classes.alignCards + ' ' + CardsClass}>
                            {cards}
                    </div>
                </div>
                <span>{this.props.deckNumber}: </span>
                <p>sum:{this.props.deckSum}</p>
            </div>
        )
    }    
}



export default React.memo(Deck)