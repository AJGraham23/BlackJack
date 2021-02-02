import React , {Component, Fragment} from 'react'
import Card from './Card/Card'
import classes from './Deck.module.css'
import uniqueId from 'uniqid'
import { doubleBid } from '../../../Store/Actions';

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
                >
            </Card> 
            })
        }
        return (
            
            <div classes={classes.Deck}>
                <div className={classes.Cards}>
                    <Fragment>
                        {cards}
                    </Fragment>
                </div>
                <p>sum:{this.props.deckSum}</p>
            </div>
        )
    }    
}



export default React.memo(Deck)