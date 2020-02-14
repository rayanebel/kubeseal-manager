import React from 'react'
import Controller from './Controller/Controller'
import Title from '../Controllers/Title/Title'
import classes from './Controllers.module.css'

const controllers = props => {
  // const controllerNamespaces = Object.keys(props.controllers)
  // const controllersList = controllerNamespaces.map(nsKey => {
  //   const services = props.controllers[nsKey]
  //   return (
  //     <div key={nsKey}>
  //       <Title title={nsKey} />
  //       {services.map((service, i) => (
  //         <Controller key={i} controller={service} />
  //       ))}
  //     </div>
  //   )
  // })

  const controllersList = props.controllers.map(controller => {
    return (
      <div key={controller.namespace}>
        <Title title={controller.namespace} />

        {controller.items.map((item, i) => {
          return <Controller key={i} controller={item} />
        })}
      </div>
    )
  })

  return <div className={classes.Controllers}>{controllersList}</div>
}

export default controllers
