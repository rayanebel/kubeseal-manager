import React from 'react'
import Toolbar from './Toolbar/Toolbar'

const layout = props => {
  return (
    <>
      <Toolbar />
      {props.children}
    </>
  )
}

export default layout
