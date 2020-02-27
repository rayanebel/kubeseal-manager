import React from 'react'
import Layout from './components/Layout/Layout'
import Dashboard from './containers/Dashboard/Dashboard'
import classes from './App.module.css'
import { BrowserRouter as Router } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className={classes.App}>
        <Layout>
          <Dashboard />
        </Layout>
      </div>
    </Router>
  )
}

export default App
