import React from 'react'
import classes from './ControllerFilters.module.css'
import Select from 'react-select'
import { MdFilterList } from 'react-icons/md'
import { IconContext } from 'react-icons'

const controllerFilters = props => {
  return (
    <div className={classes.Filter}>
      <div className={classes.FilterMenu}>
        <div
          className={classes.FilterTitle}
          onClick={props.collapseFiltersOnclick}
        >
          <IconContext.Provider
            value={{
              size: '15px',
            }}
          >
            <MdFilterList />
          </IconContext.Provider>
          <span>Filters</span>
        </div>
        {props.showControllerFilters ? (
          <>
            <div className={classes.FilterBox}>
              <span className={classes.FilterLabels}>Namespaces</span>
              <Select
                options={props.namespaces}
                isMulti
                className={classes.NamespaceSelectBox}
                onChange={(value, action) =>
                  props.namespaceChangeHandler(value, action)
                }
              />
            </div>
            <div className={classes.FilterBox}>
              <div className={classes.FilterLabels}>Status</div>
              <div>
                <input
                  type="checkbox"
                  name="running"
                  onClick={e =>
                    props.statusChangeHandler(e.target.name, e.target.checked)
                  }
                />
                <span className={classes.FilterLabels}>Running</span>
              </div>
              <div>
                <input
                  type="checkbox"
                  name="failed"
                  value="failed"
                  onClick={e =>
                    props.statusChangeHandler(e.target.name, e.target.checked)
                  }
                />
                <span className={classes.FilterLabels}>Fail</span>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  )
}

export default controllerFilters
