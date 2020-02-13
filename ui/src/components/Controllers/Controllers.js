import React from 'react'
import Controller from './Controller/Controller'
import Title from '../Controllers/Title/Title'
import classes from './Controllers.module.css'

const controllers = props => {
  const controllerNamespaces = Object.keys(props.controllers)
  const controllersList = controllerNamespaces.map(nsKey => {
    const services = props.controllers[nsKey]
    return (
      <div key={nsKey}>
        <Title title={nsKey} />
        {services.map((service, i) => (
          <Controller key={i} controller={service} />
        ))}
      </div>
    )
  })

  return <div className={classes.Controllers}>{controllersList}</div>
}

export default controllers
