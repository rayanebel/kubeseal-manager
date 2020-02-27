import React from 'react'
import classes from './NewSealedSecret.module.css'
import Input from '../../components/Form/Input/Input'
import Select from '../../components/Form/Select/Select'
import Checkbox from '../../components/Form/Checkbox/Checkbox'

const options = ['strict', 'namespace-wide', 'cluster-wide']
const mode = ['raw', 'secret']

function newSealedSecret() {
  return (
    <div className={classes.Container}>
      <div className={classes.Card}>
        <div className={classes.Header}>New SealedSecret</div>
        <div className={classes.Body}>
          <div>
            <div className={[classes.FormGroup, classes.FormInline].join(' ')}>
              <Input
                name="Controller Name"
                title="Controller Name"
                type="text"
                placeholder=""
              />
            </div>
            <div className={[classes.FormGroup, classes.FormInline].join(' ')}>
              <Input
                name="Controller Namespace"
                title="Controller Namespace"
                type="text"
                placeholder=""
              />
            </div>
          </div>

          <div className={[classes.FormGroup, classes.FormInline].join(' ')}>
            <Select options={options} title="Scope" name="Scope" />
          </div>
          <div className={[classes.FormGroup, classes.FormInline].join(' ')}>
            <Checkbox options={mode} name="Scope" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default newSealedSecret
