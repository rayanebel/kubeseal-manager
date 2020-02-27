import React from 'react'
import classes from './ButtonLink.module.css'
import { FaUserSecret } from 'react-icons/fa'
import { IconContext } from 'react-icons'
import { Link } from 'react-router-dom'

const buttonLink = props => {
  return (
    <div className={classes.Container}>
      <Link to="/form" className={classes.ButtonLink}>
        <IconContext.Provider
          value={{
            style: { color: '#FCD04B' },
            size: '20px',
            className: classes.Icon,
          }}
        >
          <FaUserSecret />
        </IconContext.Provider>
        <span className={classes.Text}>Seal</span>
      </Link>
    </div>
  )
}

export default buttonLink
