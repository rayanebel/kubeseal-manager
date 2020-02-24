import React from 'react'
import classes from './KubesealDashboard.module.css'
import Controllers from '../../components/Controllers/Controllers.js'
import ControllerFilters from '../../components/Controllers/ControllerFilters/ControllerFilters'

// Rewrite this into function and use useState
// Rename this component to ControllerDashBoard
class KubesealDashboard extends React.Component {
  // Create multiple state using useState: Namespacefilters, StatusFilters, controllers, filteredControllers, ShowControllerContainer.
  state = {
    filters: {
      namespaces: [],
      status: {
        running: false,
        failed: false,
      },
    },
    filteredControllers: [],
    showControllerFilters: false,
    controllers: [
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
      {
        namespace: 'test',
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
      {
        namespace: 'cicd',
        items: [
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
          {
            serviceName: 'kubeseal-controller',
            namespace: 'system',
            status: 'running',
          },
        ],
      },
    ],
  }

  // Rename this
  collapseFiltersOnClickHandler = () => {
    //Update into new syntax
    this.setState(prevState => {
      return {
        showControllerFilters: !prevState.showControllerFilters,
        filteredControllers: prevState.showControllerFilters
          ? []
          : prevState.filteredControllers,
      }
    })
  }

  getControllers = () => {
    return this.state.filteredControllers.length > 0
      ? this.state.filteredControllers
      : this.state.controllers
  }

  filtersOnchangeHandler = () => {
    const controllers = JSON.parse(JSON.stringify(this.state.controllers))
    let filteredControllers = []
    let controllerFilteredByNamespace = []
    const namespaceFilters = this.state.filters.namespaces

    const statusFilters = Object.keys(this.state.filters.status).filter(key => {
      return this.state.filters.status[key]
    })

    if (namespaceFilters.length > 0) {
      controllerFilteredByNamespace = controllers.filter(controller => {
        return namespaceFilters.indexOf(controller.namespace) > -1
      })
    }

    filteredControllers =
      controllerFilteredByNamespace.length > 0
        ? controllerFilteredByNamespace
        : controllers

    if (statusFilters.length > 0) {
      filteredControllers = filteredControllers.map(controller => {
        controller.items = controller.items.filter(el => {
          return statusFilters.indexOf(el.status) > -1
        })

        return controller
      })
    }

    //Update into new syntax
    this.setState({
      filteredControllers: filteredControllers,
    })
  }

  //Update into new syntax
  updateNamespaceFilters = (value, action) => {
    let namespaceFilters = []

    if (value) {
      namespaceFilters = value.map(filter => {
        return filter.value
      })
    }

    //Update into new syntax
    this.setState(
      function(prevState) {
        return {
          filters: { ...prevState.filters, namespaces: namespaceFilters },
        }
      },
      () => this.filtersOnchangeHandler()
    )
  }

  //Update into new syntax
  updateStatusFilters = (name, value) => {
    this.setState(
      function(prevState) {
        return {
          filters: {
            ...prevState.filters,
            status: { ...prevState.filters.status, [name]: value },
          },
        }
      },
      () => {
        return this.filtersOnchangeHandler()
      }
    )
  }

  // Transform this to function syntax
  render() {
    const filterNamespacesOptions = this.state.controllers.map(controller => {
      return {
        value: controller.namespace,
        label: controller.namespace,
      }
    })

    return (
      <div className={classes.KubesealDashboard}>
        <ControllerFilters
          namespaces={filterNamespacesOptions}
          namespaceChangeHandler={this.updateNamespaceFilters}
          statusChangeHandler={this.updateStatusFilters}
          collapseFiltersOnclick={this.collapseFiltersOnClickHandler}
          showControllerFilters={this.state.showControllerFilters}
        />
        <Controllers controllers={this.getControllers()} />
      </div>
    )
  }
}

export default KubesealDashboard
