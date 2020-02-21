import React from 'react'
import classes from './Controller.module.css'
import { FaHeart, FaHeartBroken } from 'react-icons/fa'
import { IconContext } from 'react-icons'
import logo from './logo.png'
import Button from '../Button/Button'

const controller = props => {
  let statusClass = classes.StatusOK
  if (props.controller.status === 'failed') {
    statusClass = classes.StatusNOK
  }

  return (
    <div className={classes.Controller}>
      <div className={classes.Header}>
        <span>
          <img src={logo} alt="" width="30" height="30" />
          {props.controller.serviceName}
        </span>

        <div className={statusClass}>
          {props.controller.status === 'running' ? (
            <IconContext.Provider
              value={{ style: { color: '#3dc791' }, size: '10px' }}
            >
              <FaHeart />
            </IconContext.Provider>
          ) : (
            <IconContext.Provider value={{ color: 'red', size: '10px' }}>
              <FaHeartBroken />
            </IconContext.Provider>
          )}
        </div>
      </div>

      <div className={classes.Body}>
        <div className={classes.Labels}>
          <p>Service Name: {props.controller.serviceName}</p>
          <p>Namespace: {props.controller.namespace}</p>
        </div>
        <Button>Submit</Button>
      </div>
    </div>
  )
}

export default controller
