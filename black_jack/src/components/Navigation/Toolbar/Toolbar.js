import React from 'react'
import classes from './Toolbar.module.css'
import Logo from '../../UI/Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'

function Toolbar(props) {
    return (
        <header className={classes.Toolbar}>
           <div><Logo/></div>
           <NavigationItems></NavigationItems>
            {/* <p>
                this is from Toolbar
            {' \n' + props.children}
            </p> */}
        </header>
    )
}

export default Toolbar
