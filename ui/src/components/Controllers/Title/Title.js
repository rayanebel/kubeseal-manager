import React from 'react'
import classes from './Title.module.css'

const title = props => {
  return <h4 className={classes.Title}>{props.title}</h4>
}

export default title
