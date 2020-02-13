import React from 'react'
import classes from './KubesealDashboard.module.css'
import Controllers from '../../components/Controllers/Controllers.js'

class KubesealDashboard extends React.Component {
  state = {
    controllers: {
      default: [
        {
          serviceName: 'kubeseal-controller',
          namespace: 'default',
          status: true,
        },
        {
          serviceName: 'kubeseal-controller-2',
          namespace: 'default',
          status: true,
        },
      ],
      system: [
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
  }

  render() {
    console.log(this.state.controllers)
    return (
      <div className={classes.KubesealDashboard}>
        <p>KubesealDashboard</p>
        <Controllers controllers={this.state.controllers} />
      </div>
    )
  }
}

export default KubesealDashboard
