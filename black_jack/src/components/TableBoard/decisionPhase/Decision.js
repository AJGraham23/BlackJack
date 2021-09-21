import React, { Component } from 'react'
import {connect} from 'react-redux'
import classes from './Decision.module.css'

import Control from '../../UI/Controls/Control/Control'
import * as actions from '../../../Store/Actions/index'


export class Decision extends Component {

    changeNextButton = (val) => {
        this.props.changeNextStatus(true)
    }

    render() {
        return (
            <div 
            className={classes.Decision}
            >
                <Control
                visibility='visible'
                clicked={() => this.changeNextButton(true)}
                >
                    Next
                </Control>
            </div>
        )
    }
}

const MapStateToProps = state => {
    return {
    }
}
//clicked


const mapDistpatchToprops = dispatch => {
    return {
        changeNextStatus : (nextState) => dispatch(actions.changeNextValue(nextState))

    }
}


export default connect(null,mapDistpatchToprops)(Decision)
