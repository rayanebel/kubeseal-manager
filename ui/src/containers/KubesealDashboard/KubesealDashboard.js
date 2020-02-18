import React from 'react'
import classes from './KubesealDashboard.module.css'
import Controllers from '../../components/Controllers/Controllers.js'
import ControllerFilters from '../../components/Controllers/ControllerFilters/ControllerFilters'

class KubesealDashboard extends React.Component {
  state = {
    showSealModal: false,
    controllers: [
      {
        namespace: 'default',
        items: [
          {
            serviceName: 'kubeseal-controller',
            namespace: 'system',
            status: true,
          },
          {
            serviceName: 'kubeseal-controller-2',
            namespace: 'default',
            status: true,
          },
        ],
      },
      {
        namespace: 'system',
        items: [
          {
            serviceName: 'kubeseal-controller',
            namespace: 'system',
            status: false,
          },
          {
            serviceName: 'kubeseal-controller',
            namespace: 'system',
            status: true,
          },
          {
            serviceName: 'kubeseal-controller',
            namespace: 'system',
            status: true,
          },
        ],
      },
      {
        namespace: 'test',
        items: [
          {
            serviceName: 'kubeseal-controller',
            namespace: 'system',
            status: false,
          },
          {
            serviceName: 'kubeseal-controller',
            namespace: 'system',
            status: true,
          },
          {
            serviceName: 'kubeseal-controller',
            namespace: 'system',
            status: true,
          },
        ],
      },
      {
        namespace: 'cicd',
        items: [
          {
            serviceName: 'kubeseal-controller',
            namespace: 'system',
            status: true,
          },
          {
            serviceName: 'kubeseal-controller',
            namespace: 'system',
            status: true,
          },
          {
            serviceName: 'kubeseal-controller',
            namespace: 'system',
            status: true,
          },
        ],
      },
    ],
  }

  //const filterOnchange

  render() {
    const filterNamespacesOptions = this.state.controllers.map(controller => {
      return {
        value: controller.namespace,
        label: controller.namespace,
      }
    })

    return (
      <div className={classes.KubesealDashboard}>
        <ControllerFilters namespaces={filterNamespacesOptions} />
        <Controllers controllers={this.state.controllers} />
      </div>
    )
  }
}

export default KubesealDashboard
