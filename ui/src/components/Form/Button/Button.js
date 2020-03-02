import React from 'react'
import classes from './Button.module.css'

const button = props => {
  let classNames = [classes.Button]
  if (props.type === 'danger') {
    classNames.push(classes.Danger)
  } else {
    classNames.push(classes.Primary)
  }
  return (
    <button className={classNames.join(' ')} type="submit">
      {props.title}
    </button>
  )
}

export default button
