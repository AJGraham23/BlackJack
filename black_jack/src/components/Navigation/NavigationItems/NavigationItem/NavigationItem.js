import React from 'react'
import classses from "./NavigationItem.module.css";
import { NavLink } from 'react-router-dom'

function NavigationItem(props) {
    return (
        <div className={classses.NavigationItem}>
            <li>
                <NavLink 
                    to={props.link}
                    exact
                    activeClassName={classses.active}>   
                {props.name}</NavLink>
                {/* <a href={props.link}>{props.name}</a> */}
            </li>
        </div>
    )
}

export default NavigationItem
