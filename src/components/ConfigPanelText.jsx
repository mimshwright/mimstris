import React, {Component, PropTypes} from 'react'

class ConfigPanelText extends Component {
  getTextValue () { return this.refs.input.value }

  render () {
    return (
      <div className='configPanelText'>
        <label>{this.props.label}: </label>
        <div className='instructions'>{this.props.instructions}</div>
        <input ref='input' type='text'
          defaultValue={this.props.value}
          onChange={() => { this.props.onChange(this.getTextValue()) }} />
      </div>
    )
  }
}

ConfigPanelText.propTypes = {
  label: PropTypes.string.isRequired,
  instructions: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default ConfigPanelText
