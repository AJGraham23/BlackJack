import React,{useEffect} from 'react'
import classes from './Help.module.css'
import SurfacePicture from '../../pictures/surface.jpg'

function Help() {

    // const [renders,setRenderes] = useState(0)
    // let x = 0;
    useEffect(()=>{
        console.log('help component is rendering');
        // ssad
    },[])
    console.count();
    return (
        <div className={classes.Help}>
            <h1>BlackJack </h1>
            <img 
                alt="blackjack"
                src={SurfacePicture}></img>
            <p className={classes.firstP}>
                B lackjack (formerly Black Jack and Vingt-Un) is a casino banking game. 
                The most widely played casino banking game in the world, it uses decks of 52 cards and descends from a global family 
                of casino banking games known as Twenty-One. This family of card games also includes the British game of Pontoon and the European game, 
                Vingt-et-Un. Blackjack players do not compete against each other. The game is a comparing card game where each player competes against the dealer. - Wikipidia

            </p>
            <h2>
                House Rules:    
            </h2>
            <p>
                <ul>
                    <li>Hit: only enabled if you have an unfinished Deck of Cards</li>
                    <li>Split: split hand Deck of two cards to two new Card decks , and the bid doubles up<br></br>(Bid equal initial first bid for each splitted Deck).
                        <br></br>Up to 3 Splits
                    </li>
                    <li>Insurance: Insurance pays 1 to 2</li>
                    <li>Limitless number of cards decks (no card count) </li>
                    <li></li>
                </ul> 
            </p>

        </div>
    )
}

export default Help
