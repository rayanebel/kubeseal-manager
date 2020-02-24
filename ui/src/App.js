import React from 'react'
import Layout from './components/Layout/Layout'
import Dashboard from './containers/Dashboard/Dashboard'
import classes from './App.module.css'

function App() {
  return (
    <div className={classes.App}>
      <Layout>
        <Dashboard />
      </Layout>
    </div>
  )
}

export default App
