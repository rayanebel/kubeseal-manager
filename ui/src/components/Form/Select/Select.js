import React from 'react'
import classes from './Select.module.css'

const select = props => {
  const options = props.options.map(option => {
    return (
      <option key={option} value={option} label={option}>
        {option}
      </option>
    )
  })

  return (
    <div className={classes.SelectContainer}>
      <label htmlFor={props.name} className={classes.SelectLabel}>
        {props.title}
      </label>
      <select className={classes.Select} name={props.name} value={props.value}>
        {options}
      </select>
    </div>
  )
}

export default select
