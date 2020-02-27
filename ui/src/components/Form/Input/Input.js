import React from 'react'
import classes from './Input.module.css'

const input = props => {
  return (
    <div className={classes.InputContainer}>
      <label htmlFor={props.name} className={classes.InputLabel}>
        {props.title}
      </label>
      <input
        className={classes.Input}
        id={props.name}
        name={props.name}
        type={props.type}
        value={props.value}
        placeholder={props.placeholder}
      />
    </div>
  )
}

export default input
