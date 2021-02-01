import React, { Component } from 'react'
import Button from './Button/Button'
import classes from './Buttons.module.css'


export class Buttons extends Component {


    endGame = () => {
        console.log('game will end');
    }
    continue = () => {
        console.log('game will continue');
    }

    render() {
        return (
            <div className={classes.Buttons}>
                <Button clicked={this.continue}>continiue</Button>
                <Button clicked={this.endGame}>end Game</Button>
            </div>
        )
    }
}

export default Buttons
