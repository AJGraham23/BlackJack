import React from 'react'
import NavigationItem from "./NavigationItem/NavigationItem";
import classses from "./NavigationItems.module.css";

function NavigationItems() {
    return (
        <div className={classses.NavigationItems}>
           <NavigationItem name={'help'} link={'help'}></NavigationItem>
           <NavigationItem link={'/'} name={'Game'}></NavigationItem>
        </div>
    )
}

export default NavigationItems
