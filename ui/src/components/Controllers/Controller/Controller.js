import React from 'react'
import classes from './Controller.module.css'
import { FaHeart, FaHeartBroken } from 'react-icons/fa'
import { IconContext } from 'react-icons'
import logo from '../../../assets/images/logo.png'
import ButtonLink from '../ButtonLink/ButtonLink'

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
          {props.controller.name}
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
          <p>
            <strong>Service Name</strong>: {props.controller.name}
          </p>
          <p>
            <strong>Namespace</strong>: {props.controller.namespace}
          </p>
          <p>
            <strong>FQDN</strong>: {props.controller.service_url}
          </p>
        </div>
        <ButtonLink>Submit</ButtonLink>
      </div>
    </div>
  )
}

export default controller
