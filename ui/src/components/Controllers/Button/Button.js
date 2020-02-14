import React from 'react'
import classes from './Button.module.css'
import { FaUserSecret } from 'react-icons/fa'
import { IconContext } from 'react-icons'

const button = props => {
  return (
    <div className={classes.Container}>
      <button className={classes.Button}>
        <IconContext.Provider
          value={{ style: { color: '#FCD04B' }, size: '20px' }}
        >
          <FaUserSecret />
        </IconContext.Provider>
        Seal
      </button>
    </div>
  )
}

export default button
