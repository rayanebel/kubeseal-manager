import React from 'react'
import classes from './Toolbar.module.css'
import Logo from './logo.png'

const toolbar = props => {
  return (
    <div className={classes.Toolbar}>
      <span className={classes.Brand}>
        <img src={Logo} alt="" width="40" height="40" /> Kubeseal Manager
      </span>
    </div>
  )
}

export default toolbar
