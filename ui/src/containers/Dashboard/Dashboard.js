import React, { useState, useEffect, useCallback } from 'react'
import classes from './Dashboard.module.css'
import Controllers from '../../components/Controllers/Controllers.js'
import ControllerFilters from '../../components/Controllers/ControllerFilters/ControllerFilters'
import axios from 'axios'

const fixedControllers = [
  {
    namespace: 'default',
    items: [
      {
        serviceName: 'kubeseal-controller',
        namespace: 'system',
        status: 'running',
      },
      {
        serviceName: 'kubeseal-controller-2',
        namespace: 'default',
        status: 'running',
      },
    ],
  },
  {
    namespace: 'system',
    items: [
      {
        serviceName: 'kubeseal-controller',
        namespace: 'system',
        status: 'failed',
      },
      {
        serviceName: 'kubeseal-controller',
        namespace: 'system',
        status: 'running',
      },
      {
        serviceName: 'kubeseal-controller',
        namespace: 'system',
        status: 'running',
      },
    ],
  },
]

function Dashboard() {
  const [namespaceFilters, setNamespaceFilters] = useState([])
  const [statusFilters, setStatusFilters] = useState({
    running: false,
    failed: false,
  })
  const [controllers, setControllers] = useState([])
  const [showControllerFilters, setShowControllerFilters] = useState(true)
  const [filteredControllers, setFilteredControllers] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/controllers')
      .then(response => {
        console.log(response)
        setControllers([...response.data.controllers])
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  const filtersOnchangeHandler = useCallback(() => {
    const controllersDump = JSON.parse(JSON.stringify(controllers))
    let filteredControllers = []
    let controllerFilteredByNamespace = []
    const nsFilters = namespaceFilters

    const stateFilters = Object.keys(statusFilters).filter(key => {
      return statusFilters[key]
    })

    if (nsFilters.length > 0) {
      controllerFilteredByNamespace = controllersDump.filter(controller => {
        return nsFilters.indexOf(controller.namespace) > -1
      })
    }

    filteredControllers =
      controllerFilteredByNamespace.length > 0
        ? controllerFilteredByNamespace
        : controllersDump

    if (stateFilters.length > 0) {
      filteredControllers = filteredControllers.map(controller => {
        controller.items = controller.items.filter(el => {
          return stateFilters.indexOf(el.status) > -1
        })
        return controller
      })
    }

    setFilteredControllers(filteredControllers)
  }, [controllers, namespaceFilters, statusFilters])

  useEffect(() => {
    console.log('OK')
    return filtersOnchangeHandler()
  }, [statusFilters])

  useEffect(() => {
    return filtersOnchangeHandler()
  }, [namespaceFilters])

  const getControllers = () => {
    return filteredControllers.length > 0 ? filteredControllers : controllers
  }

  const displayFiltersOnclick = () => {
    const previousState = showControllerFilters
    if (!previousState === false) {
      setShowControllerFilters(prevState => !prevState)
      setFilteredControllers([])
      return
    }
    setShowControllerFilters(prevState => !prevState)
  }

  const updateNamespaceFilters = (value, action) => {
    let namespaceFilters = []

    if (value) {
      namespaceFilters = value.map(filter => {
        return filter.value
      })
    }

    setNamespaceFilters(namespaceFilters)
  }

  const updateStatusFilters = (name, value) => {
    setStatusFilters(prevState => {
      return {
        ...prevState,
        [name]: value,
      }
    })
  }

  const filterNamespacesOptions = controllers.map(controller => {
    return {
      value: controller.namespace,
      label: controller.namespace,
    }
  })

  return (
    <div className={classes.KubesealDashboard}>
      <ControllerFilters
        namespaces={filterNamespacesOptions}
        namespaceChangeHandler={updateNamespaceFilters}
        statusChangeHandler={updateStatusFilters}
        collapseFiltersOnclick={displayFiltersOnclick}
        showControllerFilters={showControllerFilters}
      />
      <Controllers controllers={getControllers()} />
    </div>
  )
}

export default Dashboard
