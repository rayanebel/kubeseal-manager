import React, { useState } from 'react'
import classes from './NewSealedSecret.module.css'
import Input from '../../components/Form/Input/Input'
import Select from '../../components/Form/Select/Select'
import Checkbox from '../../components/Form/Checkbox/Checkbox'
import Button from '../../components/Form/Button/Button'
import { MdAddCircle } from 'react-icons/md'
import { IconContext } from 'react-icons'

const options = ['strict', 'namespace-wide', 'cluster-wide']
const mode = ['raw', 'secret']

function NewSealedSecret() {
  const [secrets, setSecrets] = useState([])

  const addSecretInputOnclick = e => {
    console.log(e)
    setSecrets(prevState => {
      return [...prevState, { key: '', secret: '' }]
    })
  }

  let secretsForm = secrets.map((secret, i) => {
    const iconStyle = {
      verticalAlign: 'middle',
    }
    return (
      <div key={'secret-input-' + i}>
        <div className={[classes.FormGroup, classes.FormInline].join(' ')}>
          <Input
            name={'key' + i}
            title="Key"
            type="text"
            placeholder="key"
            value={secret.key}
          />
        </div>
        <div className={[classes.FormGroup, classes.FormInline].join(' ')}>
          <Input
            name="Secret"
            title="Secret"
            type="text"
            placeholder="Secret"
            value={secret.value}
          />
        </div>
        <span style={iconStyle}>
          <IconContext.Provider value={{ size: '20px' }}>
            <MdAddCircle onClick={addSecretInputOnclick} id="1" />
          </IconContext.Provider>{' '}
        </span>
      </div>
    )
  })

  if (secretsForm.length === 0) {
    const iconStyle = {
      verticalAlign: 'middle',
    }
    secretsForm = (
      <div>
        <div className={[classes.FormGroup, classes.FormInline].join(' ')}>
          <Input name="key" title="Key" type="text" placeholder="key" />
        </div>
        <div className={[classes.FormGroup, classes.FormInline].join(' ')}>
          <Input
            name="Secret"
            title="Secret"
            type="text"
            placeholder="Secret"
          />
        </div>
        <span style={iconStyle}>
          <IconContext.Provider value={{ size: '20px' }}>
            <MdAddCircle onClick={addSecretInputOnclick} id="1" />
          </IconContext.Provider>{' '}
        </span>
      </div>
    )
  }

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
                disabled
                value="kubeseal-controller"
              />
            </div>
            <div className={[classes.FormGroup, classes.FormInline].join(' ')}>
              <Input
                name="Controller Namespace"
                title="Controller Namespace"
                type="text"
                placeholder=""
                disabled
                value="default"
              />
            </div>
          </div>

          <div className={[classes.FormGroup, classes.FormInline].join(' ')}>
            <Select options={options} title="Scope" name="Scope" />
          </div>
          <div className={[classes.FormGroup, classes.FormInline].join(' ')}>
            <Checkbox options={mode} name="Scope" />
          </div>
          {secretsForm}
        </div>
        <div className={classes.Footer}>
          <Button title="seal" />
          <Button title="cancel" type="danger" />
        </div>
      </div>
    </div>
  )
}

export default NewSealedSecret
