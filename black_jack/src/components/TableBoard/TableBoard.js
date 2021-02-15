import React, { Component , Fragment , memo } from 'react'
import Dealer from './Dealer/Dealer'
import {connect} from 'react-redux'
import Player from './Player/Player'
import classes from './TableBoard.module.css'
import StartButton from '../UI/startButton/startButton'
import * as actions from '../../Store/Actions/index'
// import Buttons from './Buttons/Buttons'
import Money from '../UI/Money/Money'
import Controls from '../UI/Controls/Controls'
import Chips from '../UI/Chips/Chips'

export class TableBoard extends Component {

    state = {
        playing:false
    }

    
    startGameFunc = (e) => {
        this.props.startGame();
        this.setState({playing:true});
        e.preventDefault();
        
        
    }
    
    render() {
       
        let playerStillAlive = (<Fragment>
            <div className={classes.dealerAndPlayer}>     
                
                <Dealer></Dealer>
                <Chips></Chips>
                <Player></Player>
            </div>
            <div className={classes.Money}>
                <Money children={'nope'}>
                </Money>
            </div>
            <div className={classes.Controls}>
                <Controls></Controls>
            </div>
        </Fragment>);

        let playerLost = <div className={classes.playerLost}>
            better luck next time </div>

       console.count('tableBoard')
        return (
            <div className={classes.TableBoard}>
                {this.props.lost ? playerLost: playerStillAlive}
            </div>
        )
    }
}




const MapStateToProps = state => {
    return {
        playing : state.game.isPlaying,
        lost: state.game.lost        
    }
}

const mapDistpatchToProps = dispatch => {
    return {
        startGame : () => dispatch(actions.startGame()),
          }
}


export default connect(MapStateToProps,mapDistpatchToProps)(memo(TableBoard))


