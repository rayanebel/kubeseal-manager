import React from 'react'
import Controller from './Controller/Controller'
import Title from '../Controllers/Title/Title'
import classes from './Controllers.module.css'

const controllers = props => {
  let useSeparatorClass = false
  const controllersList = props.controllers.map((controller, i) => {
    const globalStatus = controller.items.every(function(e) {
      return e.status === 'running'
    })
    useSeparatorClass = !useSeparatorClass
    return controller.items.length > 0 ? (
      <div
        key={controller.namespace}
        className={
          useSeparatorClass
            ? classes.ControllerBoxGrey
            : classes.ControllerBoxDefault
        }
      >
        <Title globalStatus={globalStatus} title={controller.namespace} />
        {controller.items.map((item, i) => {
          return <Controller key={i} controller={item} />
        })}
      </div>
    ) : null
  })
  return <div className={classes.Controllers}>{controllersList}</div>
}

export default controllers
