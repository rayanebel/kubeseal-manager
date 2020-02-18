import React from 'react'
import Controller from './Controller/Controller'
import Title from '../Controllers/Title/Title'
import classes from './Controllers.module.css'
import Select from 'react-select'

const controllers = props => {
  // const filtered = ['system']
  // function filtereController(Controllerfilters) {
  //   if (Controllerfilters.length === 0) {
  //     return props.controllers
  //   }
  //   return props.controllers.filter(controller => {
  //     return Controllerfilters.indexOf(controller.namespace) > -1
  //   })
  // }

  // const statusFilters = null
  // function filterStatus(items) {
  //   if (statusFilters === null) {
  //     return items
  //   }
  //   return props.controllers.filter(controller => {
  //     return statusFilters.indexOf(controller.namespace) > -1
  //   })
  // }

  // const filteredController = filtereController(filtered).map(controller =>
  //   filterStatus(controller.items)
  // )

  const controllersList = props.controllers.map((controller, i) => {
    const globalStatus = controller.items.every(function(e) {
      return e.status === true
    })
    return (
      <div key={controller.namespace} className={classes.ControllerBox}>
        <Title globalStatus={globalStatus} title={controller.namespace} />
        {controller.items.map((item, i) => {
          return <Controller key={i} controller={item} />
        })}
        {i < props.controllers.length - 1 ? (
          <hr className={classes.ControllerSeparator}></hr>
        ) : null}
      </div>
    )
  })
  return <div className={classes.Controllers}>{controllersList}</div>
}

export default controllers
