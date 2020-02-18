import React from 'react'
import classes from './ControllerFilters.module.css'
import Select from 'react-select'
import { MdFilterList } from 'react-icons/md'
import { IconContext } from 'react-icons'

const controllerFilters = props => {
  return (
    <div className={classes.FilterMenu}>
      <div className={classes.FilterTitle}>
        <IconContext.Provider
          value={{
            size: '15px',
          }}
        >
          <MdFilterList />
        </IconContext.Provider>
        <span>Filters</span>
      </div>
      <div className={classes.FilterBox}>
        <span className={classes.FilterLabels}>Namespaces</span>
        <Select
          options={props.namespaces}
          isMulti
          className={classes.NamespaceSelectBox}
          onChange={(a, b) => {
            console.log(a, b)
          }}
        />
      </div>
      <div className={classes.FilterBox}>
        <div className={classes.FilterLabels}>Status</div>
        <div>
          <input type="checkbox" name="Running" />
          <span className={classes.FilterLabels}>Running</span>
        </div>
        <div>
          <input type="checkbox" name="Failed" />
          <span className={classes.FilterLabels}>Fail</span>
        </div>
      </div>
    </div>
  )
}

export default controllerFilters
