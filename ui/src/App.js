import React from 'react';
import Layout from './components/Layout/Layout'
import KubesealDashboard from './containers/KubesealDashboard/KubesealDashboard'
import classes from './App.module.css'

function App() {
  return (
    <div className={classes.App}>
      <Layout>
        <KubesealDashboard />
      </Layout>
    </div>
  );
}

export default App;
