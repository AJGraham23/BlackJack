import React from 'react'
import classes from './Logo.module.css'
import { Link } from 'react-router-dom'
// import IconLogo from '../../../icon/LOGO.svg'
// import pictureLogo from '../../../pictures/logo.png'
// import IconLogo from '../../../icon/LOGO.svg'

function Logo() {
    return (
        <div className={classes.Logo}>
           <Link to={'/'}>
               {/* <img src={pictureLogo}></img> */}
           </Link>
            
        </div>
    )
}

export default Logo