import React from 'react'
import classes from './Toolbar.module.css'
import Logo from './logo.png'

const toolbar = props => {
  return (
    <div className={classes.Toolbar}>
      <img src={Logo} alt="" width="65" height="65" />
    </div>
  )
}

export default toolbar
