import React, {PropTypes} from 'react'

const ConfigPanelCheckbox = props => (
  <div className='configPanelCheckbox'><label htmlFor={props.label}>{props.label}: </label><input id={props.label} type='checkbox' defaultChecked={props.value ? 'checked' : ''} onChange={props.onChange} /></div>
)

ConfigPanelCheckbox.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired
}

export default ConfigPanelCheckbox
