import React from 'react'
import classes from './Checkbox.module.css'

const checkbox = props => {
  const checkboxs = props.options.map(option => {
    return (
      <label key={option} className={classes.RadioLabel}>
        <input
          className={classes.Radio}
          id={props.name}
          name={props.name}
          type="radio"
          value={option}
          placeholder={props.placeholder}
        />{' '}
        {option}
      </label>
    )
  })
  return (
    <div className={classes.RadioContainer}>
      <label className={classes.RadioTitle}>Mode</label>
      {checkboxs}
    </div>
  )
}

export default checkbox
