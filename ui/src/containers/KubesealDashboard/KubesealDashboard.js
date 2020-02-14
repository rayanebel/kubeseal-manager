import React from 'react'
import classes from './KubesealDashboard.module.css'
import Controllers from '../../components/Controllers/Controllers.js'
import Title from '../../components/UI/Title/Title'

class KubesealDashboard extends React.Component {
  // state = {
  //   controllers: {
  //     default: [
  //       {
  //         serviceName: 'kubeseal-controller',
  //         namespace: 'default',
  //         status: true,
  //       },
  //       {
  //         serviceName: 'kubeseal-controller-2',
  //         namespace: 'default',
  //         status: true,
  //       },
  //     ],
  //     system: [
  //       {
  //         serviceName: 'kubeseal-controller',
  //         namespace: 'system',
  //         status: false,
  //       },
  //       {
  //         serviceName: 'kubeseal-controller',
  //         namespace: 'system',
  //         status: true,
  //       },
  //       {
  //         serviceName: 'kubeseal-controller',
  //         namespace: 'system',
  //         status: true,
  //       },
  //     ],
  //   },
  // }

  state = {
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
    ],
  }

  render() {
    console.log(this.state.controllers)
    return (
      <div className={classes.KubesealDashboard}>
        {/* <Title>Dashboard</Title> */}
        <Controllers controllers={this.state.controllers} />
      </div>
    )
  }
}

export default KubesealDashboard
