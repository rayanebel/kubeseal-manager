import React from 'react'
import classes from './Title.module.css'
import { FaHeart, FaHeartBroken } from 'react-icons/fa'
import { IconContext } from 'react-icons'

const title = props => {

  let statusClass = classes.StatusOK
  if (!props.globalStatus) {
    statusClass = classes.StatusNOK
  }

  return (
    <div>
      <div className={statusClass}>
        {props.globalStatus ? (
          <IconContext.Provider
            value={{ style: { color: '#3dc791' }, size: '15px' }}
          >
            <FaHeart />
          </IconContext.Provider>
        ) : (
          <IconContext.Provider value={{ color: 'red', size: '15px' }}>
            <FaHeartBroken />
          </IconContext.Provider>
        )}
      </div>
      <h4 className={classes.Title}>{props.title}</h4>
    </div>


  );
}

export default title
