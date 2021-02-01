import React, { Component } from 'react'

export class ResualtRender extends Component {

    state = {
        winner:''
    }

    render() {
        return (
            <div>
                this winner is {this.state.winner}
            </div>
        )
    }
}

export default ResualtRender
